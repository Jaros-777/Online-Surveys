import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import './UserPanel.scss'
import { UserMail } from "../App";
import FrontPage from "./Sections/FrontPage";
import AddNewSurvey from "./NewSurvey/AddNewSurvey";
import SurveyDetails from "./SurveyDetails/SurveyDetails";
import axios from "axios";

export default function UserPanel() {

    const [isLogged, setIsLogged] = useState(true)
    const [mail, setMail] = useContext(UserMail)
    const [suerveysList, setSurveysList] = useState(
        [
            {
                id: 0,
                name: "Moje ulubione jedzenie",
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

    const fetchSurveys =async()=>{
        //fetch id, name and answers count
        

    }



    // useEffect(()=>{
    //     checkLogged();
    //     fetchSurveys();
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
                        <button onClick={()=>setCurrentSection(<AddNewSurvey funct={"new"}></AddNewSurvey>)}>New survey</button>
                        <h3>My surveys</h3>
                        <ul>
                            {suerveysList.map((e) => (
                                <li onClick={()=>setCurrentSection(<SurveyDetails setCurrentSection={setCurrentSection} id={e.id}></SurveyDetails>)} key={e.id} className="surveyButton">
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