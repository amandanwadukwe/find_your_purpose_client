import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ThumbsUp from "../resources/thumbs_up.png";

export default function Lessons(props) {
    let { chapterDetails } = useParams();
    const [allCourses, setAllCourses] = useState([]);
    const [activeChapterNumber, setActiveChapterNumber] = useState(Number(chapterDetails.split("-")[0]));
    const [activePageNumber, setActivePageNumber] = useState(Number(chapterDetails.split("-")[1]));
    const [userResponse, setUserResponse] = useState("")
    const [endOfPage, setEndOfPage] = useState(false);



    console.log(userResponse)

    useEffect(() => {
        axios.get('http://localhost:5000/courses')
            .then(result => setAllCourses(result.data))
            .catch(err => console.log(err))
    }, [])

    props.menu();


    return <section className="lesson-container">
        <div>
            {allCourses.map(course => {
                let numberOfPagesInCurrentChapter = Object.values(course.chapters[`${activeChapterNumber}`].pages).length
                let numberOfChaptersInCourse = Object.values(course.chapters).length

                return <div>

                    <div dangerouslySetInnerHTML={{ __html: course.chapters[`${activeChapterNumber}`].pages[`${activePageNumber}`] }}></div>
                    <textarea className={(activePageNumber > 1 && activePageNumber < 8) || (activePageNumber > 9 && activePageNumber < 25) ? "lesson-input display" : "hide"} value={userResponse} onChange={() => setUserResponse}></textarea>
                    <div className={(activePageNumber >= 8 && activePageNumber < 10)? "radio-btns-container display" : "hide"}>
                        <div
                            className="radio-btn"
                            onClick={() => {
                                setUserResponse("1");
                            }}
                        >
                            <input
                                type="radio"
                                value={userResponse}
                                name="scale-response"
                                checked={userResponse == "1"}
                            />
                            1
                        </div>
                        <div
                            className="radio-btn"
                            onClick={() => {
                                setUserResponse("2");
                            }}
                        >
                            <input
                                type="radio"
                                value={userResponse}
                                name="scale-response"
                                checked={userResponse == "2"}
                            />
                            2
                        </div>
                        <div
                            className="radio-btn"
                            onClick={() => {
                                setUserResponse("3");
                            }}
                        >
                            <input
                                type="radio"
                                value={userResponse}
                                name="scale-response"
                                checked={userResponse == "3"}
                            />
                            3
                        </div>
                        <div
                            className="radio-btn"
                            onClick={() => {
                                setUserResponse("4");
                            }}
                        >
                            <input
                                type="radio"
                                value={userResponse}
                                name="scale-response"
                                checked={userResponse == "4"}
                            />
                            4
                        </div>
                        <div
                            className="radio-btn"
                            onClick={() => {
                                setUserResponse("5");
                            }}
                        >
                            <input
                                type="radio"
                                value={userResponse}
                                name="scale-response"
                                checked={userResponse == "5"}
                            />
                            5
                        </div>
                    </div>
                    <div className={(activePageNumber ==25)? "display" : "hide"}>
                            <p>Let's do it!</p>
                            <img className="page-icon" src={ThumbsUp} alt="thumbs up!"/>
                        </div>
                        <div className="lesson-navigation-btns">
                    <button type="button" className={endOfPage ? "hide" : "display"} onClick={() => {
                        if (numberOfPagesInCurrentChapter - activePageNumber >= 0) {
                            setActivePageNumber(activePageNumber - 1)
                        } else {
                            // if(numberOfChaptersInCourse - activeChapterNumber >=0){
                            // // console.log("Change chapter")
                            // setActiveChapterNumber(activeChapterNumber - 1)
                            // setActivePageNumber(1)
                            // } else {
                            //     // console.log("End of course")
                            // }
                            setEndOfPage(true)
                        }
                    }} >Previous</button>
                    <button type="button" onClick={() => {
                        if (numberOfPagesInCurrentChapter > activePageNumber) {
                            setActivePageNumber(activePageNumber + 1)
                        } else {
                            if (numberOfChaptersInCourse > activeChapterNumber) {
                                // console.log("Change chapter")
                                setActiveChapterNumber(activeChapterNumber + 1)
                                setActivePageNumber(1)
                            } else {
                                // console.log("End of course")
                            }
                        }
                    }} >Next</button>
                    </div>
                    <span>{course.course_name}</span>

                </div>
            })}
        </div>
    </section>
}