import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"

export default function UserPanel() {

    const[isLogged, setIsLogged] = useState(false)
    const[mail, setMail] = useState("")


    const checkLogged=()=>{
        const token = localStorage.getItem("token");

    if (token) {
        console.log("Użytkownik jest zalogowany");
        const email = localStorage.getItem("email");
        console.log("Zalogowany jako:", email);
        setIsLogged(true)
        setMail(email)
    } else {
        console.log("Nie jesteś zalogowany");
        setIsLogged(false)
        setMail("")
    }
    }

    

    useEffect(()=>{
        checkLogged();
    },[])

    return (
        <>
            <p>User Panel</p>
            <p>Zalogowany: {isLogged.toString()}</p>
            <p>{mail}</p>

        </>
    )
}