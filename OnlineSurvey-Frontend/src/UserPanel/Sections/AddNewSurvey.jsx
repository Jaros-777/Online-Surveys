import { useState } from "react";
import "./AddNewSurvey.scss";
import RenderModule from "./RenderModule.jsx"

export default function AddNewSurvey() {
    const[surveyDetails,setSurveyDetails] = useState(
        {
            title:"Pierwsza ankieta",
            description:"To moja pierwsza ankieta",
            randomOrder: false
        }
    )
    const [modulList, setModuleList] = useState([
        {
            id: Date.now(),
            questionDetails: {
                questionName: "",
                type: "single",
                answers: [
                    {
                        answerId: Date.now(),
                        answerName: "Pierwsza odpowiedz"
                    }
                ],
                correctAnswers: []
            }
        }
    ]);


    const deleteQuestion = (idToRemove) => {
        setModuleList(prevList => prevList.filter(q => q.id !== idToRemove));
    };

    const deleteAnswer = (id, answerId) => {
        setModuleList(prevList =>
            prevList.map(q =>
                q.id === id
                    ? {
                        ...q,
                        questionDetails: {
                            ...q.questionDetails,
                            answers: q.questionDetails.answers.filter(ans => ans.answerId !== answerId),
                            correctAnswers: q.questionDetails.correctAnswers.filter(ca => ca !== answerId)
                        }
                    }
                    : q
            )
        );
    };

    const addQuestion = () => {
        setModuleList(prev => [
            ...prev,
            {
                id: Date.now(),
                questionDetails: {
                    questionName: "Pytanie no 1",
                    type: "single",
                    answerCount: 1,
                    answers: [{
                        answerId: Date.now(),
                        answerName: ""
                    }],
                    correctAnswers: []
                }
            }
        ]);
    };

    const updateQuestion = (id, field, value) => {
        setModuleList(prev =>
            prev.map(q =>
                q.id === id
                    ? {
                        ...q,
                        questionDetails: {
                            ...q.questionDetails,
                            [field]: value
                        }
                    }
                    : q
            )
        );
    };

    const updateAnswers = (id, answerId, value) => {
        setModuleList(prev =>
            prev.map(q =>
                q.id === id
                    ? {
                        ...q,
                        questionDetails: {
                            ...q.questionDetails,
                            answers: q.questionDetails.answers.map(ans =>
                                ans.answerId === answerId
                                    ? { ...ans, answerName: value }
                                    : ans
                            )
                        }
                    }
                    : q
            )
        );
    };

    const toggleCorrectAnswer = (id, answerId, isChecked) => {
        setModuleList(prev =>
            prev.map(q => {
                if (q.id !== id) return q;

                const { type, correctAnswers } = q.questionDetails;

                let newCorrectAnswers;
                if (type === "single") {
                    newCorrectAnswers = isChecked ? [answerId] : [];
                } else {
                    if (isChecked) {
                        newCorrectAnswers = [...correctAnswers, answerId];
                    } else {
                        newCorrectAnswers = correctAnswers.filter(id => id !== answerId);
                    }
                }

                return {
                    ...q,
                    questionDetails: {
                        ...q.questionDetails,
                        correctAnswers: newCorrectAnswers
                    }
                };
            })
        );
    };

    const handleCreateSurvey = () => {
        const JsonToSend = {
            details: surveyDetails,
            questions: modulList,
        }
        console.log(JsonToSend)
    };


    return (
        <div id="new-survey-container">
            <h1>Create a new survey</h1>
            <section>
                <p>Survey Title</p>
                <input type="text" placeholder="Enter survey title" onChange={(e)=>setSurveyDetails({ ...surveyDetails,title: e.target.value} )} value={surveyDetails.title}/>
            </section>
            <section>
                <p>Survey Description</p>
                <textarea value={surveyDetails.description} onChange={(e)=>setSurveyDetails({ ...surveyDetails,  description: e.target.value} )} placeholder="Description of your survey"></textarea>
            </section>
            {/* <div id="description">
                <textarea name={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description of your survey"></textarea>
            </div> */}
            <p style={{ marginTop: "1rem", fontWeight: "bold" }} >Questions</p>
            {modulList.map((e) => (
                <RenderModule
                    key={e.id}
                    id={e.id}
                    questionDetails={e.questionDetails}
                    deleteQuestion={deleteQuestion}
                    updateQuestion={updateQuestion}
                    updateAnswers={updateAnswers}
                    deleteAnswer={deleteAnswer}
                    toggleCorrectAnswer={toggleCorrectAnswer}
                />
            ))}
            <button style={{ marginTop: "1rem" }} onClick={addQuestion}>Add question</button>
            <div id="answer-option">
                <p style={{ fontWeight: "bold" }}>Configuration</p>
                <div className="option">
                    <input type="checkbox" value={surveyDetails.randomOrder} onChange={(e)=>setSurveyDetails({ ...surveyDetails,  randomOrder: e.target.checked} )} />
                    <p>Random order</p>
                </div>
            </div>
            <button onClick={handleCreateSurvey}>Create survey</button>
        </div>
    );
}
