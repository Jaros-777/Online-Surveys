import "./MainPage.scss"
import { Navigate, useNavigate } from "react-router-dom"
import SurveyImg from "./assets/survey.jpg"
import { useEffect, useState } from "react";
import Auth from "./Auth";

export default function MainPage() {

    let nav = useNavigate();
    const [mail, setMail] = useState("")
    const [loginFormVisibility, setLoginFormVisibility] = useState(false)

    const handleEnterLogin = () => {
        if (loginFormVisibility == false) {
            setLoginFormVisibility(true)
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            setLoginFormVisibility(false)
            document.body.style.overflow = 'auto';
        }


    }

    const checkLogged = () => {
        const token = localStorage.getItem("token");

        if (token) {
            nav("/panel")
        }
    }
    
    useEffect(()=>{
        checkLogged();
    },[])

    return (
        <>
            <div id="main-page">
                {loginFormVisibility ? <Auth mail={mail} handleEnterLogin={handleEnterLogin}></Auth> : null}

                <div id="first">
                    <div id="description">
                        <div id="main-text">
                            <p>Online surveys</p>
                            <p>for free</p>
                        </div>
                        <div id="content">
                            <p>Modern software for customer satisfaction, employee feedback, market research and other surveys.</p>
                        </div>
                        <ul>
                            <li>100+ ready-made survey templates</li>
                            <li>Real-time analytics and tools</li>
                            <li>Seamless integrations with CRM, email</li>
                            <li>Multilingual support for global reach</li>
                            <li>Secure data storage with SSL encryption and GDPR compliance</li>
                            <li>Mobile-optimized surveys for any device</li>
                        </ul>
                        <div id="start-container">
                            <input type="text" value={mail} onChange={(e) => { setMail(e.target.value) }} placeholder="Your email" />
                            <button onClick={() => handleEnterLogin()}>Create survey</button>
                        </div>
                    </div>
                    <div id="description-image">
                        <img src={SurveyImg} alt="Survey image" />
                    </div>
                </div>
                <div id="second">

                </div>

            </div>
        </>
    )
}