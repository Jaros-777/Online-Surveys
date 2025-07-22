import { useParams } from "react-router-dom"
import "./Survey.scss"
import { useEffect, useState } from "react";
import Question from "./Question";
import axios from "axios";

export default function Survey() {

    const id = useParams();

    const [surveyDetails, setSurveyDetails] = useState(null)
    const [loaded, setLoaded] = useState(false)

    const fetchSurvey = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/survey/for-user`, { id: id.id });
            // console.log(user.token)
            console.log(response.data[0])
            setSurveyDetails(response.data[0])
            setLoaded(true)

        } catch (error) {
            console.log(error)
            setLoaded(false)
            // LogOut();
        }
    }

    const sendAnswers = async () => {

    }

    const chooseAnswer = (answerId, value) => {
        // setSurveyDetails();
    }

    useEffect(() => {
        fetchSurvey()
    }, [])

    
    if(!loaded){
        return <p>Loading...</p>
    }

    return (
        <div id="survey-container">
            <div id="survey-content">
                <div id="description">
                    <h1>{surveyDetails.title}</h1>
                    <h3>{surveyDetails.description}</h3>
                </div>
                <ul>
                    {surveyDetails.questions.map((e) => (
                        <li key={e.id}>
                            <Question question={e} chooseAnswer={chooseAnswer}></Question>
                        </li>

                    ))}
                </ul>

                <button onClick={sendAnswers}>Send answers</button>
            </div>

        </div>
    )
}