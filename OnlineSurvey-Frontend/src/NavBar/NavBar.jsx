import { useContext, useEffect, useRef, useState } from "react"
import "./NavBar.scss"
import { useLocation } from "react-router-dom"
import {UserMail} from "../App.jsx"


export default function NavBar(){

    const[user,setUser] = useState(null)
    const[mail,setMail] = useContext(UserMail)
    const[mailVisibility, setMailVisibility] = useState(true)

    
    const url = useLocation().pathname;
    useEffect(()=>{
        

        setMailVisibility(url === "/panel");
    },[url])

    

    return(
        <>
            <nav>
                <h1>Online Surveys</h1>
                {mailVisibility ? <h3>{mail}</h3> : null}
                
            </nav>
        </>
    )
}