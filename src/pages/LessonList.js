import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


export default function LessonList(props){
    const [allCourses, setAllCourses] = useState([]);
    const [courseError, setCourseError] = useState("");

    let {name} = useParams();

    props.menu();


    useEffect(() => {
        axios.get("http://localhost:5000/courses")
            .then(res => setAllCourses(res.data))
            .catch(err => setCourseError(err))
    }, [])

// console.log(Object.values(allCourses[0].chapters))
    return <section>
        <span>{courseError}</span>
        <div className="lessons">
            {allCourses.map(course =>{
                if(name === course.course_name){
                    return Object.values(course.chapters).map((chapter,chapterIndex) => {
                        return <div className="lesson" onClick={()=> window.location.href = `/lessons/${chapterIndex+1}-1`}>
                            <div>i</div>
                            <span>{chapter.info}</span>
                            <h2>{chapter.title}</h2>
                        </div>
                    })
                }
            })}
        </div>
    </section>
}