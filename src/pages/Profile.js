import { useState, useEffect } from "react";
import Character from "../resources/character.png";
import Settings from "../resources/settings.svg";
import axios from "axios";

export default function Profile(props) {
    // const [username, setUsername] = useState("");
    const [accountInformation, setAccountInformation] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [coursesError, setCoursesError] = useState("");
    const [error, setError] = useState("");
    const [activeInfoChapterName, setActiveInfoChapterName] = useState(0);
    const [showDescription, setShowDescription] = useState(false);
    let acitvatedUnfinishedCourse = "";

    useEffect(() => {
        axios.get("http://localhost:5000/courses")
            .then(res => setAllCourses(res.data))
            .catch(err => setCoursesError(err))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/account/amandanwadukwe@gmail.com")
            .then(res => {
                setAccountInformation(res.data)
            })
            .catch(err => setError(err))
    }, [])

    props.menu();


    function redirectToLesson() {

        window.location.href = `http://localhost:3000/lessons/${acitvatedUnfinishedCourse}`
    }

    return <section className="profile-container">
        <div className="icon-to-left">
            <img onClick={()=>{window.location.href=`/settings`}} className="animate-on-hover-icon" src={Settings} alt="settings" />
        </div>
        <div className="personal-details">
            <img src={Character} className="avatar" alt="Your avatar" />

            <h2 className="name">{accountInformation.length > 0 ? `${accountInformation[0].first_name} ${accountInformation[0].last_name}` : `Loading...`}</h2>
            {/* add this to the registration form and the database */}
            <span className="pronouns">She/her</span>
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
    </section>
}