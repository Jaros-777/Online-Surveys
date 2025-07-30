import { useEffect, useState } from "react";
import "./AddNewSurvey.scss";
import RenderModule from "./RenderModule.jsx"

export default function AddNewSurvey({ funct, survey }) {
    const [surveyDetails, setSurveyDetails] = useState(
        {
            id: Date.now(),
            title: "",
            description: "",
            totalAttempts: 0,
            randomOrder: false,
            questions: [
                {
                    id: Date.now(),
                    name: "question name",
                    type: "single",
                    correctAnswer: [],
                    openAnswer: [],
                    answers: [
                        {
                            id: Date.now(),
                            answerName: "",
                            chosenCount: 0
                        }
                    ]
                }
            ]
        }
    )
    // console.log(surveyDetails)


    const deleteQuestion = (idToRemove) => {
        setModuleList(prevList => prevList.filter(q => q.id !== idToRemove));
    };

    const deleteAnswer = (id, answerId) => {

        setSurveyDetails(prev => {
            const updatedSurvey = {
                ...prev,
                questions:
                    prev.questions.map(q =>
                        q.id === id ?
                            {
                                ...q,
                                answers:
                                    q.answers.filter(ans => ans.id !== answerId),
                                correctAnswer: q.correctAnswer.filter(ca => ca !== answerId)
                            } :
                            q
                    )
            }
            // console.log(updatedSurvey)
            return updatedSurvey
        })
    };

    const addQuestion = () => {
        setModuleList(prev => [
            ...prev,
            {
                id: Date.now(),
                questionDetails: {
                    questionName: "",
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

    const updateQuestion = (id,field, value) => {
        // console.log(id,value)

        setSurveyDetails(prev => {
            const updatedSurvey = {
                ...prev,
                questions:
                    prev.questions.map(q =>
                        q.id === id ?
                            { ...q, [field]: value } :
                            q
                    )
            }
            // console.log(updatedSurvey)
            return updatedSurvey
        })



    };

    const updateAnswers = (id, answerId, value) => {

        setSurveyDetails(prev => {
            const updatedSurvey = {
                ...prev,
                questions:
                    prev.questions.map(q =>
                        q.id === id ?
                            {
                                ...q,
                                answers:
                                    q.answers.map(a =>
                                        a.id == answerId ?
                                            { ...a, answerName: value } :
                                            a
                                    )
                            } :
                            q
                    )
            }
            // console.log(updatedSurvey)
            return updatedSurvey
        })

        // setModuleList(prev =>
        //     prev.map(q =>
        //         q.id === id
        //             ? {
        //                 ...q,
        //                 questionDetails: {
        //                     ...q.questionDetails,
        //                     answers: q.questionDetails.answers.map(ans =>
        //                         ans.answerId === answerId
        //                             ? { ...ans, answerName: value }
        //                             : ans
        //                     )
        //                 }
        //             }
        //             : q
        //     )
        // );
    };

    const toggleCorrectAnswer = (questionId, answerId, isChecked) => {

        setSurveyDetails(prev => {
            const updatedSurvey = {
                ...prev,
                questions:
                    prev.questions.map(q =>
                        q.id === questionId ?
                            {
                                ...q,
                                ...(q.type === "single" ?
                                    {correctAnswer:[answerId]} :
                                    q.type)
                                // correctAnswer: prev.correctAnswer.map(ca =>
                                //     q.type === "single" ?
                                //     {[answerId]} :
                                //     ca
                                // )
                            } :
                            q
                    )
            }
            console.log(updatedSurvey.questions[0])
            return updatedSurvey
        })

        // setModuleList(prev =>
        //     prev.map(q => {
        //         if (q.id !== id) return q;

        //         const { type, correctAnswers } = q.questionDetails;

        //         let newCorrectAnswers;
        //         if (type === "single") {
        //             newCorrectAnswers = isChecked ? [answerId] : [];
        //         } else {
        //             if (isChecked) {
        //                 newCorrectAnswers = [...correctAnswers, answerId];
        //             } else {
        //                 newCorrectAnswers = correctAnswers.filter(id => id !== answerId);
        //             }
        //         }

        //         return {
        //             ...q,
        //             questionDetails: {
        //                 ...q.questionDetails,
        //                 correctAnswers: newCorrectAnswers
        //             }
        //         };
        //     })
        // );
    };

    const handleCreateSurvey = async () => {
        console.log(surveyDetails)
    };
    const handleUpdateSurvey = async () => {
        console.log(surveyDetails)
    };


    useEffect(() => {
        if (funct == "change") {
            setSurveyDetails(survey)
            console.log("useEffect", survey)
        }
    }, [funct, survey])


    return (
        <div id="new-survey-container">
            <h1>Create a new survey</h1>
            <section>
                <p>Survey Title</p>
                <input type="text" placeholder="Enter survey title" onChange={(e) => setSurveyDetails({ ...surveyDetails, title: e.target.value })} value={surveyDetails.title} />
            </section>
            <section>
                <p>Survey Description</p>
                <textarea value={surveyDetails.description} onChange={(e) => setSurveyDetails({ ...surveyDetails, description: e.target.value })} placeholder="Description of your survey"></textarea>
            </section>
            {/* <div id="description">
                <textarea name={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description of your survey"></textarea>
            </div> */}
            <p style={{ marginTop: "1rem", fontWeight: "bold" }} >Questions</p>
            {surveyDetails.questions.map((e) => (
                <RenderModule
                    key={e.id}
                    question={e}
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
                    <input type="checkbox" value={surveyDetails.randomOrder} onChange={(e) => setSurveyDetails({ ...surveyDetails, randomOrder: e.target.checked })} />
                    <p>Random order</p>
                </div>
            </div>
            <button onClick={funct == "new" ? handleCreateSurvey : handleUpdateSurvey}>Create survey</button>
        </div>
    );
}
