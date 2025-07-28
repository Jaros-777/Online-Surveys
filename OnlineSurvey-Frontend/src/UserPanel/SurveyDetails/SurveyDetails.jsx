import "./SurveyDetails.scss"
import Details from "./Details"
import { useState } from "react"
import AddNewSurvey from "../NewSurvey/AddNewSurvey"


export default function SurveyDetails({ surveyList, setCurrentSection }) {

    const [loaded, setLoaded] = useState(true)
    const [infoContainerVisibility, setInfoContainerVisibility] = useState(false)

    const [surveyDetails, setSurveyDetails] = useState(surveyList)
    // console.log(surveyDetails)

    // const [surveyDetails, setSurveyDetails] = useState({
    //     details: {
    //         id: 0,
    //         title: "Moje ulubione jedzenie",
    //         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ab corrupti molestias, adipisci magnam id perspiciatis quis beatae doloribus vitae iure non ea, sint autem repellat dolor obcaecati, praesentium reiciendis?",
    //         randomOrder: false,
    //         link: "http://localhost:5173/panel/1535345363262134626346"
    //     },
    //     questions: [{
    //         id: 0,
    //         visitorsCount: 2,
    //         totalAnswerCount: 2,
    //         questionDetails: {
    //             questionName: "Najlepszy fast-food",
    //             type: "single",
    //             answers: [
    //                 {
    //                     answerId: 0,
    //                     answerName: "Pizza",
    //                     choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 1,
    //                     answerName: "Kebab",
    //                     choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 2,
    //                     answerName: "Hamburger",
    //                     choosenCount: 1,
    //                 },
    //                 {
    //                     answerId: 3,
    //                     answerName: "Hot-dog",
    //                     choosenCount: 1,
    //                 },
    //             ],
    //             correctAnswers: [1]
    //         }
    //     },
    //     {
    //         id: 1,
    //         visitorsCount: 5,
    //         totalAnswerCount: 4,
    //         questionDetails: {
    //             questionName: "Ulubione miasto",
    //             type: "single",
    //             answers: [
    //                 {
    //                     answerId: 0,
    //                     answerName: "Paryż",
    //                     choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 1,
    //                     answerName: "Warszawa",
    //                     choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 2,
    //                     answerName: "Londyn",
    //                     choosenCount: 1,
    //                 },
    //                 {
    //                     answerId: 3,
    //                     answerName: "Los Angeles",
    //                     choosenCount: 3,
    //                 },
    //             ],
    //             correctAnswers: [3]
    //         }
    //     }
    //     ]
    // }
    // )


    const copyToClickBoardFunc = () => {
        navigator.clipboard.writeText(window.location.origin +"/survey/"+ surveyDetails.id)
        setInfoContainerVisibility(true)
        setTimeout(() => {
            setInfoContainerVisibility(false)
        }, 1000);

    }

    const loadingPage = () => {

        return <p>Loading...</p>
    }

    return (
        loaded ?
            <div id="survey-container">
                <div id="top">
                    <h1>{surveyDetails.title}</h1>
                    <button onClick={() => setCurrentSection(<AddNewSurvey funct={"change"} surveyId={surveyDetails.id} ></AddNewSurvey>)} >Edit</button>
                </div>
                <div id="link-to-survey">
                    <div id="link-text">
                        <small>Link to survey</small>
                        <p>{window.location.origin +"/survey/"+ surveyDetails.id}</p>
                    </div>
                    <button onClick={copyToClickBoardFunc}>Copy to clickboard</button>
                    {infoContainerVisibility ?
                        <div id="info-container">
                            <p>Copied</p>
                        </div>
                        : null}

                </div>
                <div id="survey-desc">
                    <p>{surveyDetails.description}</p>
                </div>
                <h3>Results:</h3>
                {surveyDetails.questions.map((e, index) => (
                    <Details key={e.id} index={index+1} totalAttempts={surveyList.totalAttempts} question={e}></Details>
                ))}
            </div>

            : loadingPage()


    )
}