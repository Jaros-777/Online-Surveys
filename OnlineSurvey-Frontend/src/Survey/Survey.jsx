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
        
        console.log(surveyDetails)
        try {
            await axios.post("http://localhost:8080/survey/answer", surveyDetails)
        } catch (error) {
            console.log(error)
        }
        

    }

    const chooseAnswer = (questionId, answerId, value) => {
    setSurveyDetails(prev => {
        const updated = {
            ...prev,
            questions: prev.questions.map(q => {
                if (q.id === questionId) {
                    
                    if (q.type === "open") {
                        // answers:
                        // {
                        //     answerName: value
                        // }
                        return {
                             ...q,
                            // openAnswer: value
                            answers:
                                [{
                                    id:0,
                                    answerName: value,
                                    chosenCount:1
                                }]
                        };
                    }

                    
                    const isMultiple = q.type === "multiple";

                    const updatedChosenAnswers = isMultiple
                        ? q.chosenAnswers.includes(answerId)
                            ? q.chosenAnswers.filter(id => id !== answerId)
                            : [...q.chosenAnswers, answerId]
                        : [answerId];

                    return {
                        ...q,
                        chosenAnswers: updatedChosenAnswers
                    };
                }
                return q;
            })
        };
        // console.log(updated)
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