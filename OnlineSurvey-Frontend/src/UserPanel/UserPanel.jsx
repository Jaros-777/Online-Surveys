import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import './UserPanel.scss'
import { UserMail } from "../App";
import FrontPage from "./Sections/FrontPage";
import AddNewSurvey from "./Sections/AddNewSurvey";

export default function UserPanel() {

    const [isLogged, setIsLogged] = useState(true)
    const [mail, setMail] = useContext(UserMail)
    const [suerveysList, setSurveysList] = useState(
        [
            {
                id: 0,
                name: "Survey 1",
                asnwersCount: 2
            },
            {
                id: 1,
                name: "Survey 2",
                asnwersCount: 2
            }
        ]
    )
    const [currentSection, setCurrentSection] = useState(<AddNewSurvey></AddNewSurvey>)


    const checkLogged = () => {
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



    // useEffect(()=>{
    //     checkLogged();
    // },[])

    if (!isLogged) {
        return <p>You are not logged</p>
    }

    return (
        <>
            <p>Zalogowany: {isLogged.toString()}</p>
            <div id="panel-container">
                <div id="panel-content">
                    <div id="options">
                        <button onClick={()=>setCurrentSection(<AddNewSurvey></AddNewSurvey>)}>Add new survey</button>
                        <ul>
                            {suerveysList.map((e) => (
                                <li key={e.id} className="surveyButton">
                                    <p>{e.name}</p>
                                    <p>{e.asnwersCount} received</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="content">
                        {currentSection}
                    </div>
                </div>
            </div>

        </>
    )
}