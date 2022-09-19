import { useState, useEffect } from "react";
import Character from "../resources/character.png";
import Edit from "../resources/edit.svg";
import Settings from "../resources/settings.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

export let userEmailFromProfile ;


export default function Profile(props) {
    // const [username, setUsername] = useState("");
    const [accountInformation, setAccountInformation] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [coursesError, setCoursesError] = useState("");
    const [error, setError] = useState("");
    const [activeInfoChapterName, setActiveInfoChapterName] = useState(0);
    const [showDescription, setShowDescription] = useState(false);
    let acitvatedUnfinishedCourse = "";

    let {email} = useParams();

    useEffect(() => {
        userEmailFromProfile = email;
       }, [email])

    useEffect(() => {
        axios.get("http://localhost:5000/courses")
            .then(res => setAllCourses(res.data))
            .catch(err => setCoursesError(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/account/${email}`)
            .then(res => {
                setAccountInformation(res.data.filter(account => account.email == email))
            })
            .catch(err => setError(err))
    }, [])

    props.menu();

    // console.log(accountInformation);
    
    function redirectToLesson() {

        window.location.href = `http://localhost:3000/lessons/${acitvatedUnfinishedCourse}`
    }

    return <section className="profile-container">
        <div className="icon-to-left">
            <img onClick={()=>{window.location.href=`/settings/${accountInformation[0].email}`}} className="page-icon animate-on-hover-icon" src={Settings} alt="settings" />
            <button type="button" onClick={()=> window.location.href="/"} style={{marginLeft:"1rem"}}>Log out</button>
        </div>
        <div className="personal-details">
            <img src={Character} className="avatar" alt="Your avatar" />

            <h2 className="name">{accountInformation.length > 0 ? `${accountInformation[0].first_name} ${accountInformation[0].last_name}` : `Loading...`}</h2>
            {/* add this to the registration form and the database */}
            <span className="pronouns">{accountInformation.length > 0 ? `${accountInformation[0].pronouns> 0 ? accountInformation[0].pronouns : "set your nickname"}` : `Loading...`}</span>
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
            {accountInformation[0] !== undefined ?(<div>
                    <p><b>Notes</b></p>
                     {Object.entries(accountInformation[0].notes).length > 0 ? (
                    
                        Object.entries(accountInformation[0].notes).map(note => {
                            // console.log("note x", note[0]);
                            return <div style={{backgroundColor:"#ffffff", color:"#1491c9", width:"100%"}} className="lesson">
                                                    <img  style={{marginLeft:"auto",display:"flex"}}src={Edit} className="page-icon animate-on-hover-icon" alt="edit note"/>

                                <h2>{note[0]}</h2>
                                <p>{note[1]}</p>
                            </div>
                        })
                    ) : (<div style={{display:"flex",justifyContent:"center"}}>
                        <span>Add new notes in settings</span>
                        <img  style={{marginLeft:"auto",display:"flex"}}src={Edit} className="page-icon animate-on-hover-icon" alt="edit note"/>

                    </div>)}
            </div>):(<div>
                Loading...
            </div>)}
    </section>
}