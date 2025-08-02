import { useContext, useEffect, useState } from "react";
import "./AddNewSurvey.scss";
import RenderModule from "./RenderModule.jsx"
import { v4 as uuidv4 } from 'uuid';
import { User } from "../../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddNewSurvey({ funct, survey }) {
    const nav = useNavigate();
    const [user, setUser] = useContext(User)
    const [surveyDetails, setSurveyDetails] = useState(
        {
            id: uuidv4(),
            title: "",
            description: "",
            totalAttempts: 0,
            randomOrder: false,
            userId: user.id,
            questions: [
                {
                    id: uuidv4(),
                    name: "",
                    type: "any",
                    correctAnswer: [],
                    openAnswer: [],
                    chosenAnswers:[],
                    answers: [
                        {
                            id: uuidv4(),
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
        setSurveyDetails(prev => {
            const updatedSurvey = {
                ...prev,
                questions:
                    prev.questions.filter(q => q.id !== idToRemove)
            }
            // console.log(updatedSurvey)
            return updatedSurvey
        })

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
        setSurveyDetails(prev => {
            const updatedSurvey = {
                ...prev,
                questions: [...prev.questions,
                {
                    id: uuidv4(),
                    name: "",
                    type: "any",
                    correctAnswer: [],
                    openAnswer: [],
                    answers: [
                        {
                            id: uuidv4(),
                            answerName: "",
                            chosenCount: 0
                        }
                    ]
                }
                ]
            }

            return updatedSurvey;
        })
    };

    const updateQuestion = (id, field, value) => {
        // console.log(id,value)

        setSurveyDetails(prev => {
            let updatedSurvey = {
                ...prev,
                questions:
                    prev.questions.map(q =>
                        q.id === id ?
                            {
                                ...q,
                                [field]: value,
                                correctAnswer: []
                            } :
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
                                correctAnswer:
                                    q.type === "single" ?
                                        [answerId] :
                                        q.correctAnswer.includes(answerId) ?
                                            q.correctAnswer.filter(e => e !== answerId) :
                                            [...q.correctAnswer, answerId]

                            } :
                            q
                    )
            }
            // console.log(updatedSurvey.questions[0])
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
        

        const surveyToSend = {
            title: surveyDetails.title,
            description: surveyDetails.description,
            totalAttempts: surveyDetails.totalAttempts,
            randomOrder: surveyDetails.randomOrder,
            userId: user.id,
            questions: surveyDetails.questions.map(q=>({
                    name: q.name,
                    type: q.type,
                    correctAnswer: q.correctAnswer,
                    openAnswer: q.openAnswer,
                    answers: q.answers.map(a=>({
                            answerName: a.answerName,
                            chosenCount: a.chosenCount
                    }))
            }))
        }
        console.log("new",surveyToSend)
        
        try {
            const response = await axios.post(`http://localhost:8080/survey/new`, surveyToSend ,{
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            });

            nav("/")

        } catch (error) {
            console.log(error)
        }
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
            <form onSubmit={funct == "new" ? handleCreateSurvey : handleUpdateSurvey}>
            <section>
                <p>Survey Title</p>
                <input required type="text" placeholder="Enter survey title" onChange={(e) => setSurveyDetails({ ...surveyDetails, title: e.target.value })} value={surveyDetails.title} />
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
            <button type="submit">Create survey</button>
            </form>
        </div>
    );
}
