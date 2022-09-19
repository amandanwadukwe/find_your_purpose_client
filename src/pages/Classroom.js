import { useEffect } from "react";
import { useParams } from "react-router-dom";

export let userEmailFromClassroom;

export default function Classroom(){
    
    let {email} = useParams();

    useEffect(() => {
        userEmailFromClassroom = email;
       }, [email])

    return <section>
        <span className="error">This feature is not available on this version</span>
    </section>
}