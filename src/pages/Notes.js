import { useState } from "react";

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

    
    return <section className="notes-container">
        <div className={focusOnActiveNote || addNote ? "hide":"display"}>
            {notes.map(note=> {
                return <div className="note" onClick={()=>{
                    setFocusOnActiveNote(true);
                    setTitle(note.title);
                    setNote(note.note);
                    }}>
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