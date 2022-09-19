import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export let userEmailFromCourses;

export default function Courses(props){
    const [allCourses, setAllCourses] = useState([]);
    const [courseError, setCourseError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/courses")
            .then(res => setAllCourses(res.data))
            .catch(err => setCourseError(err))
    }, [])

    props.menu();

    let { email } = useParams();

   useEffect(() => {
    userEmailFromCourses = email;
   }, [email])

allCourses.map(course => console.log(course.course_name))
    return <section>
        <span>{courseError}</span>
        <div className="lessons">
        {allCourses.map(course => {
            return <div className="lesson" onClick={()=>window.location.href = `http://localhost:3000/course/${course.course_name}/${email}`}>
                <div>i</div>
                <span>A job preparation course</span>
                <h2>{course.course_name}</h2>
                <span>{Object.values(course.chapters).length} Chapters</span>
            </div>
        })}
        </div>

    </section>
}