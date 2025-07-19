import { useContext, useEffect, useRef, useState } from "react"
import "./NavBar.scss"
import { useLocation, useNavigate } from "react-router-dom"
import {User} from "../App.jsx"


export default function NavBar(){

    const[user,setUser] = useContext(User)
    const[mailVisibility, setMailVisibility] = useState(true)
    const nav = useNavigate();

    
    const url = useLocation().pathname;
    useEffect(()=>{
        setMailVisibility(url === "/panel");
    },[url])

    const LogOut=()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.clear();
        nav("/")
    }

    return(
        <>
            <nav>
                <h1>Online Surveys</h1>
                {mailVisibility ? <h3>{user.email}</h3> : null}
                <button onClick={LogOut}>Logout</button>
                
            </nav>
        </>
    )
}