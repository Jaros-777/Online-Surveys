import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import './UserPanel.scss'
import { User } from "../App";
import FrontPage from "./Sections/FrontPage";
import AddNewSurvey from "./NewSurvey/AddNewSurvey";
import SurveyDetails from "./SurveyDetails/SurveyDetails";
import axios from "axios";

export default function UserPanel() {

    const nav = useNavigate();
    const [isLogged, setIsLogged] = useState(true)
    const [user, setUser] = useContext(User)
    const [surveyList, setSurveyList] = useState([])
    const [currentSection, setCurrentSection] = useState(<FrontPage></FrontPage>)


    const checkLogged = () => {
        const token = localStorage.getItem("token");

        if (token) {
            // console.log("Użytkownik jest zalogowany");
            const userEmail = localStorage.getItem("email");
            const userId = localStorage.getItem("id");

            setIsLogged(true)
            setUser({ email: userEmail, token: token, id: userId });
            // console.log("Zalogowany jako:", user.email);
        } else {
            // console.log("Nie jesteś zalogowany");
            setIsLogged(false)
            setUser({ email: null, token: null, id: null });
            
        }
    }

    const fetchSurveys = async () => {
        //fetch id, name and answers count
        // console.log(user.id)
        try {
            const response = await axios.post(`http://localhost:8080/survey/userSurveys`, { id: user.id }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            });
            // console.log(user.token)
            // console.log(response.data)
            setSurveyList(response.data)

        } catch (error) {
            console.log(error)
            LogOut();
        }

    }
    const LogOut=()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.clear();
        nav("/")
    }

    

    useEffect(() => {
        checkLogged();
        if (user.token) {
            // console.log("Rozpoczecie ładowania ankiet")
            fetchSurveys();
        }

    }, [user.token])

    if (!isLogged) {
        return <p style={{textAlign:"center", marginTop:"10rem", fontSize:"4rem"}}>You are not logged in</p>
    }

    return (
        <>
            
                <div id="panel-container">
                    <div id="panel-content">
                        <div id="options">
                            <button onClick={() => setCurrentSection(<AddNewSurvey funct={"new"}></AddNewSurvey>)}>New survey</button>
                            <h3>My surveys</h3>
                            <ul>
                                {surveyList.length == 0 ? <p>You don't have any surveys yet </p> :
                                    surveyList.map((e) => (
                                        <li onClick={()=>setCurrentSection(<SurveyDetails key={e.id} setCurrentSection={setCurrentSection} survey={e}></SurveyDetails>)} key={e.id} className="surveyButton">
                                            <p>{e.title}</p>
                                            <p>{e.totalAttempts} received</p>
                                        </li>
                                    ))
                                }
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