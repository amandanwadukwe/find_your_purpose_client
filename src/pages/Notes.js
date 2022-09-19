import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Edit from "../resources/edit.svg";

export let userEmailFromNotes;

export default function Notes(props){
    const [notes, setNotes] = useState([{
        title:"Lesson 1",
        note:"Today I learnt the importance of deciding to make a change",
        date: String(new Date())
    },]);
    const [focusOnActiveNote, setFocusOnActiveNote] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    props.menu();

    const {email} = useParams();

    useEffect(() => {
        userEmailFromNotes = email;
       }, [email])

    
    return <section className="notes-container">
        <div className={focusOnActiveNote || addNote ? "hide":"display"}>
            {notes.map(note=> {
                return <div className="note" onClick={()=>{
                    setFocusOnActiveNote(true);
                    setTitle(note.title);
                    setNote(note.note);
                    }}>
                    <img  style={{marginLeft:"auto",display:"flex"}}src={Edit} className="page-icon animate-on-hover-icon" alt="edit note"/>
                    <h2>{note.title}</h2>
                    <p>{note.note}</p>
                    <span>{note.date}</span>
                </div>
            })}
        </div>
        <div onClick={()=>{setAddNote(true)}} className={focusOnActiveNote || addNote? "hide":"add display"}>+</div>
        <form className={focusOnActiveNote || addNote ? "note-form display":"hide"}onClick={()=>setFocusOnActiveNote(true)}>
            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title"/>
            <textarea value={note} onChange={(e)=>setNote(e.target.value)}placeholder="Note..."></textarea>
            <button type="button" onClick={()=>{
                setFocusOnActiveNote(false)
                setAddNote(false)}}>Save</button>
        </form>
        
        
    </section>
}