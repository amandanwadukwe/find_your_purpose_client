import React, { useState } from "react";
import axios from "axios";


export default function LoginAndReg(props){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const [login, setLogin] = useState(true);

    function handleLogin(){
        axios.get(`http://localhost:5000/${email}-${password}`)
        .then(res => {
            res.data.length > 0 ? window.location.href = `/home/${email}`:setLoginErrorMsg("This account does not exist") ;
            // console.log(res)
        })
        .catch(err => {
            // if(err.message.includes("404")){setLoginErrorMsg("This account does not exist")}
            console.log(err)
        })
           
    }
        
    props.menu();

    function handleRegister(){
        //Complete validating the registrarion form and ensure the appropriate error message is returned everytime an error occurs
        if(password === confirmPassword){
        console.log({
            first_name:firstName,
            last_name:lastName,
            email:email,
            password:password,
            date: new Date()
        })
    }else{
        setErrorMsg("Passwords don't match");
    }
    }

    return <div>
        <section className={login ? "login-container display":"hide"}>
            <h1>Login</h1>
            <span>{loginErrorMsg}</span>
            <form>
            <label>Email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/></label>
            <label>Password:<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></label>
            <button type="button" onClick={handleLogin}>Login</button>

            </form>
        </section>
        <section className={!login ? "register-container display":"hide"}>
            <h1>Registration</h1>
            <span>{errorMsg}</span>
            <form>
                <label>First name:<input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></label>
                <label>Last name:<input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></label>#
                <label>Email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/></label>
                <label>Password:<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></label>
                <label>Confirm password:<input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/></label>
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
        </section>
        <p className="login-registration-switch">{login ? "Don't have an account?" : "Already have an account?"} <span onClick={() => { setLogin(!login) }}>{login ? "Register here" : "Login here"}</span></p>

    </div>
}