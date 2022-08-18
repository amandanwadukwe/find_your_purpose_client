import React, { useState, useEffect } from "react";
import axios from "axios";
import character from "../resources/character.png";
import celebration from "../resources/celebration_edit.png";
import { useSwipeable } from "react-swipeable";
import { useParams } from "react-router-dom";

export default function Home(props) {
    const [allCourses, setAllCourses] = useState([]);
    const [accountInformation, setAccountInformation] = useState([]);
    const [coursesError, setCoursesError] = useState("");
    const [username, setUserName] = useState("");
    const [enrolledCoursesPosition,setEnrolledCoursesPosition] = useState(0);
    const [activeInfoChapterName, setActiveInfoChapterName] = useState(0);
    const [showDescription, setShowDescription] = useState(false);

    // console.log("account info", accountInformation)
    let acitvatedUnfinishedCourse = "";
    props.menu();

    let { email } = useParams();

    const handlers = useSwipeable({
        onSwipedLeft:(eventData) => setEnrolledCoursesPosition(enrolledCoursesPosition-260),
        onSwipedRight:(eventData) => setEnrolledCoursesPosition(enrolledCoursesPosition+260)
    })

    useEffect(() => {
        axios.get("http://localhost:5000/courses")
            .then(res => setAllCourses(res.data))
            .catch(err => setCoursesError(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/account/${email}`)
            .then(res => {
                setUserName(res.data[0].first_name)
                setAccountInformation(res.data)
            })
            .catch(err => setCoursesError(err))
    }, [])

    function redirectToLesson() {

        window.location.href = `http://localhost:3000/lessons/${acitvatedUnfinishedCourse}`
    }



    return <main>
        {/* What other kind of activities can be showcased here? */}
        <div className="activity">
        <div className="greeting">
            <p>Hi {username}</p>
            <img className="character" src={character} alt="avatar" />
        </div>
        {accountInformation[0] !== undefined ?
            (accountInformation[0].enrolled_courses.length > 0 ? (
                <section className="courses unfinished-courses">
                    <p><b>Where you left off:</b></p>
                    {accountInformation[0].enrolled_courses.map(unfinishedCourse => {
                        return <div className="lessons">
                            {allCourses.filter(course => course.course_id === unfinishedCourse[0]).map(course => {
                                return <div className="lesson" 
                                >
                                    <div className="more-info" onClick={()=> {
                                       setActiveInfoChapterName(course.course_name);
                                       setShowDescription(true)
                                    }}>i</div>
                                    <p className={showDescription && activeInfoChapterName === course.course_name? "course-description display" : "hide"}>{course.chapters[`${unfinishedCourse[1]}`].info}</p>
                                    <h1>Chapter {unfinishedCourse[1]}</h1>
                                    <h2 onClick={() =>
                                //setting the chapter and page to continue from and sending it to the lessons page
                                {
                                    acitvatedUnfinishedCourse = `${unfinishedCourse[1]}-${unfinishedCourse[2]}`
                                    redirectToLesson();
                                }}>{course.chapters[`${unfinishedCourse[1]}`].title}</h2>
                                    <span>{course.course_name}</span></div>
                            })}
                        </div>
                    })}
                </section>
            ) : (
                <section className="courses">
                    <span>You have no saved work</span>
                    <button type="button">Get started</button>
                </section>
            )) : (<div>Loading...</div>)}
            </div>
        {accountInformation[0] !== undefined ? (
            accountInformation[0].enrolled_courses.length > 0 ? (<section className="courses">
            {accountInformation[0].enrolled_courses.map(unfinishedCourse => {
                return <div>
                    <h2>Enrolled courses</h2>
                     {allCourses.filter(course => course.course_id === unfinishedCourse[0]).map(course => {
                        // console.log("course", course)
                        return <h1>{course.course_name}</h1>})}
                    {allCourses.filter(course => course.course_id === unfinishedCourse[0]).map(course => {
                        // console.log("course", course)
                        return <div className="lessons" {...handlers} style={{left:`${enrolledCoursesPosition}px`, transition:"left .5s linear"}}>
                           
                            {Object.values(course.chapters).map((chapter,index)=>{
                                return <div className="lesson" onClick={()=>{
                                    acitvatedUnfinishedCourse = `${index+1}-1`
                                    redirectToLesson();
                                }}>
                                    <span>{chapter.info}</span>
                                    <h2>Chapter{index + 1}</h2>
                                    <h3>{chapter.title}</h3>
                                </div>
                            })}
                            </div>
                    })}
                </div>
            })}
        </section>) : (<section>
                <p>You are not enrolled on any course, get enrolled now!</p>
            <button type="butotn">Get started</button>
            </section>)
        ) : (<div>
            Loading...
        </div>)}
        <section className="welcome">
            <div className="address">
            <p>
                Presumable, you've joined this programme because you have aspirations, dreams or ambitions and maybe you're hoping that the course will help you unlock doors to new opportunities.
            </p>
            <p>If you are, then you've just taken your first step towards a new and exciting future</p>
            <p>Well done you!</p>
            </div>
            <img className="celebration" src={celebration} alt="celebration"/>
        </section>
    </main>
}