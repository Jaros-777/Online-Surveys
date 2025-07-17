import "./SurveyDetails.scss"
import Details from "./Details"
import { useState } from "react"


export default function SurveyDetails({ questionId, setCurrentSection }) {

    const [loaded, setLoaded] = useState(true)

    const [surveyDetails, setSurveyDetails] = useState({
        details: {
            title: "Moje ulubione jedzenie",
            description: "To moja pierwsza ankieta",
            randomOrder: false
        },
        questions: [{
            id: 0,
            visitorsCount: 2,
            totalAnswerCount: 2,
            questionDetails: {
                questionName: "Najlepszy fast-food",
                type: "single",
                answers: [
                    {
                        answerId: 0,
                        answerName: "Pizza",
                        choosenCount: 0,
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
                type: "single",
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

    const fetchSurveyDetails = async () => {
        // fetch all of te survey
    }

    const loadingPage = () => {

        return <p>Loading...</p>
    }

    return (
            loaded ?
                <div id="survey-container">
                    <div id="top">
                        <h1>{surveyDetails.details.title}</h1>
                        <button onClick={()=>setCurrentSection(<AddNewSurvey funct={"change"}></AddNewSurvey>)} >Edit</button>
                    </div>
                    <p>{surveyDetails.details.description}</p>
                    <h3>Results:</h3>
                    {surveyDetails.questions.map((e) => (
                        <Details key={e.id} surveyDetails={e}></Details>
                    ))}
                </div>

                : loadingPage()
            

    )
}