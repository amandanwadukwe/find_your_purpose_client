import { useState, useEffect } from "react";
import Home from "../resources/home.svg";
import Book from "../resources/book.svg";
import Notes from "../resources/notes.svg";
import Room from "../resources/meeting_room.svg";
import Settings from "../resources/settings.svg";
import Character from "../resources/character.png";
import axios from "axios";

export default function Navigation(props){
    const [accountInformation, setAccountInformation] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/account/amandanwadukwe@gmail.com")
            .then(res => {
                setAccountInformation(res.data)
            })
            .catch(err => setError(err))
    }, [])
    console.log(accountInformation)

    return <nav className={props.showPrimaryNavigation? "primary-navigation display":"hide"}>
        <span>{error}</span>

        <div className="navigation-profile">
            <img src={Character} className="avatar" alt="Your avatar"/>
            <div onClick={()=>{window.location.href =`/profile`}}>
                <h2 className="name">{accountInformation.length > 0 ?`${accountInformation[0].first_name} ${accountInformation[0].last_name}`:`Loading...`}</h2>
                {/* add this to the registration form and the database */}
                <span className="pronouns">She/her</span>
            </div>
        </div>
        <ul>
            <li onClick={()=>window.location.href = `/home/${accountInformation[0].email}`}><img src={Home} alt="home"/><span>Home</span></li>
            <li onClick={()=>window.location.href = "/courses"}><img src={Book} alt="courses"/><span>Courses</span></li>
            <li onClick={()=>window.location.href = `/notes/${accountInformation[0].email}`}><img src={Notes} alt="notes"/><span>Notes</span></li>
            <li><img src={Room} alt="classrooms"/><span>Classrooms</span></li>
            <li onClick={()=>window.location.href = `/settings/${accountInformation[0].email}`}><img src={Settings} alt="settings"/><span>Settings</span></li>

            {/* This should be a popup */}
            <div className="help">?</div>


        </ul>
    </nav>

}