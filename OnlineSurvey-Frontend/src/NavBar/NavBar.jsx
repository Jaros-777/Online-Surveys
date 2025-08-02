import { useContext, useEffect, useRef, useState } from "react"
import "./NavBar.scss"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { User } from "../App.jsx"


export default function NavBar() {

    const [user, setUser] = useContext(User)
    const [mailVisibility, setMailVisibility] = useState(true)
    const nav = useNavigate();


    const url = useLocation().pathname;
    useEffect(() => {
        setMailVisibility(url === ("/panel" || url.slice(1, 7)));
    }, [url])

    const LogOut = () => {
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.clear();
        setUser({
            id: null,
            email: null,
            token: null
        })
        nav("/")
    }

    return (
        <>
            <nav>
                <h1 style={{ cursor: "pointer" }} onClick={() => { nav("/") }}>Online Surveys</h1>
                {mailVisibility ? <h3>{user.email}</h3> : null}
                {mailVisibility ? <button onClick={LogOut}>Logout</button> : null}
                {/* {url.slice(1,7) == "survey" ? null : 
                <button onClick={LogOut}>Logout</button>
                } */}
            </nav>
        </>
    )
}