import { useState } from "react"
import "./NavBar.scss"


export default function NavBar(){

    const[user,setUser] = useState(null)

    return(
        <>
            <nav>
                <h1>Online Surveys</h1>
            </nav>
        </>
    )
}