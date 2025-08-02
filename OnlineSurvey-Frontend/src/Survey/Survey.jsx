import { useParams } from "react-router-dom"
import "./Survey.scss"
import { useEffect, useState } from "react";
import Question from "./Question";
import axios from "axios";

export default function Survey() {

    const id = useParams();

    const [surveyDetails, setSurveyDetails] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [finished, setFinished] = useState(false)



    const fetchSurvey = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/survey/surveyTaker`, { id: id.id });
            // console.log(user.token)
            // console.log(response.data)
            setSurveyDetails(response.data)
            setLoaded(true)

        } catch (error) {
            console.log(error)
            setLoaded(false)
            // LogOut();
        }
    }

    const sendAnswers = async () => {

        // console.log(surveyDetails)
        // console.log(surveyDetails.questions[0].chosenAnswers.length)

        let toSend = false;

        for (let i = 0; i < surveyDetails.questions.length; i++) {
            if ((surveyDetails.questions[i].type == "open" && surveyDetails.questions[i].answers[0].answerName !== "") || surveyDetails.questions[i].chosenAnswers.length > 0 ) {
                toSend = true;
                break;
            }
        }


        if (toSend) {
            // console.log("wyslane")
            try {
                await axios.post("http://localhost:8080/survey/answer", surveyDetails)
                setFinished(true)
                toSend = false
            } catch (error) {
                console.log(error)
            }
        }



    }

    const chooseAnswer = (questionId, answerId, value) => {
    setSurveyDetails(prev => {
        const updated = {
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id !== questionId) return q;

                if (q.type === "open") {
                    return {
                        ...q,
                        answers: [{
                            id: 0,
                            answerName: value,
                            chosenCount: 1
                        }]
                    };
                }

                const isMultiple = q.type === "multiple";
                const wasAlreadyChosen = q.chosenAnswers.includes(answerId);

                let updatedChosenAnswers;

                if (isMultiple) {
                    // toggle
                    updatedChosenAnswers = wasAlreadyChosen
                        ? q.chosenAnswers.filter(id => id !== answerId)
                        : [...q.chosenAnswers, answerId];
                } else {
                    // single (radio-like with toggle behavior)
                    updatedChosenAnswers = wasAlreadyChosen
                        ? [] // unselect if already selected
                        : [answerId];
                }

                return {
                    ...q,
                    chosenAnswers: updatedChosenAnswers
                };
            })
        };
        return updated;
    });
};

    useEffect(() => {
        fetchSurvey()
    }, [])


    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <div id="survey-container">
            <div id="survey-content">
                {finished ?
                    <div id="info">
                        <h2 style={{ textAlign: "center", padding: "3rem 0rem" }}>Your responses have been sent. Thank you for your time.</h2>
                    </div>
                    :
                    <>
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
                    </>
                }
            </div>


        </div>
    )
}