import "./SurveyDetails.scss"
import Details from "./Details"
import { useEffect, useState } from "react"
import AddNewSurvey from "../NewSurvey/AddNewSurvey"


export default function SurveyDetails({ survey, setCurrentSection }) {

    const [loaded, setLoaded] = useState(true)
    const [infoContainerVisibility, setInfoContainerVisibility] = useState(false)

    const [surveyDetails, setSurveyDetails] = useState(survey)


    const copyToClickBoardFunc = () => {
        navigator.clipboard.writeText(window.location.origin + "/survey/" + surveyDetails.id)
        setInfoContainerVisibility(true)
        setTimeout(() => {
            setInfoContainerVisibility(false)
        }, 1000);

    }

    useEffect(() => {
        window.dispatchEvent(new Event("resize"));
    }, []);

    const loadingPage = () => {

        return <p>Loading...</p>
    }


    return (
        loaded ?
            <div id="survey-container">
                <div id="top">
                    <h1>{surveyDetails.title}</h1>
                    {/* <button onClick={() => setCurrentSection(<AddNewSurvey funct={"change"} survey={survey} ></AddNewSurvey>)} >Edit</button> */}
                </div>
                <div id="link-to-survey">
                    <div id="link-text">
                        <small>Link to survey</small>
                        <p>{window.location.origin + "/survey/" + surveyDetails.id}</p>
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
                    <Details key={e.id} index={index + 1} totalAttempts={surveyDetails.totalAttempts} question={e}></Details>
                ))}
            </div>

            : loadingPage()


    )
}