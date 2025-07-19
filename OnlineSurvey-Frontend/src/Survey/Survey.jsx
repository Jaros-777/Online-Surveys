import { useParams } from "react-router-dom"
import "./Survey.scss"
import { useState } from "react";
import Question from "./Question";

export default function Survey() {

    const id = useParams();

    const [surveyDetails, setSurveyDetails] = useState({
        details: {
            id: 0,
            title: "Moje ulubione jedzenie",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ab corrupti molestias, adipisci magnam id perspiciatis quis beatae doloribus vitae iure non ea, sint autem repellat dolor obcaecati, praesentium reiciendis?",
            randomOrder: false,
        },
        questions: [{
            id: 0,
            totalAnswerCount: 0,
            questionDetails: {
                questionName: "Najlepszy fast-food",
                type: "single",
                answers: [
                    {
                        answerId: 0,
                        answerName: "Pizza",
                        choosenCount: 0,
                        currentChoosen: false
                    },
                    {
                        answerId: 1,
                        answerName: "Kebab",
                        choosenCount: 0,
                    },
                    {
                        answerId: 2,
                        answerName: "Hamburger",
                        choosenCount: 1,
                    },
                    {
                        answerId: 3,
                        answerName: "Hot-dog",
                        choosenCount: 1,
                    },
                ],
                correctAnswers: [1]
            }
        },
        {
            id: 1,
            visitorsCount: 5,
            totalAnswerCount: 4,
            questionDetails: {
                questionName: "Ulubione miasto",
                type: "open",
                answers: [
                    {
                        answerId: 0,
                        answerName: "Paryż",
                        choosenCount: 0,
                    },
                    {
                        answerId: 1,
                        answerName: "Warszawa",
                        choosenCount: 0,
                    },
                    {
                        answerId: 2,
                        answerName: "Londyn",
                        choosenCount: 1,
                    },
                    {
                        answerId: 3,
                        answerName: "Los Angeles",
                        choosenCount: 3,
                    },
                ],
                correctAnswers: [3]
            }
        }
        ]
    }
    )

    const fetchSurvey = async () => {
        // fetch public survey
        id
    }

    const sendAnswers=async()=>{

    }

    const chooseAnswer = (answerId, value) => {
        setSurveyDetails();
    }

    return (
        <div id="survey-container">
            <div id="survey-content">
                <div id="description">
                    <h1>{surveyDetails.details.title}</h1>
                    <h3>{surveyDetails.details.description}</h3>
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