import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function Lessons(props){
    let { chapterDetails } = useParams();
    const [allCourses, setAllCourses] = useState([]);
    const [activeChapterNumber, setActiveChapterNumber] = useState(Number(chapterDetails.split("-")[0]));
    const [activePageNumber, setActivePageNumber] = useState(Number(chapterDetails.split("-")[1]));

    


    useEffect(()=>{
        axios.get('http://localhost:5000/courses')
        .then(result => setAllCourses(result.data))
        .catch(err => console.log(err))
    },[])

    props.menu();

    
    return <section>
        <div>
            <p>{chapterDetails}</p>
            {allCourses.map(course => {
                let numberOfPagesInCurrentChapter = Object.values(course.chapters[`${activeChapterNumber}`].pages).length
                let numberOfChaptersInCourse = Object.values(course.chapters).length
                
                return <div>
                    <h1>{course.course_name}</h1>
                    <div>{course.chapters[`${activeChapterNumber}`].pages[`${activePageNumber}`]}</div>
                    <button type="button" onClick={()=>{
                        if(numberOfPagesInCurrentChapter > activePageNumber){
                        setActivePageNumber(activePageNumber + 1)
                        } else {
                            if(numberOfChaptersInCourse > activeChapterNumber){
                            console.log("Change chapter")
                            setActiveChapterNumber(activeChapterNumber + 1)
                            setActivePageNumber(1)
                            } else {
                                console.log("End of course")
                            }
                        }
                    }} >Button</button>
                </div>
            })}
        </div>
    </section>
}