import { useState } from "react";
import "./AddNewSurvey.scss";
import RenderModule from "./RenderModule.jsx"

export default function AddNewSurvey() {
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

    const[description, setDescription] = useState("")

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


    return (
        <div id="new-survey-container">
            <div id="description">
                <textarea name={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description of your survey"></textarea>
            </div>
            {modulList.map((e) => (
                <RenderModule
                    key={e.id}
                    id={e.id}
                    questionDetails={e.questionDetails}
                    deleteQuestion={deleteQuestion}
                    updateQuestion={updateQuestion}
                    updateAnswers={updateAnswers}
                    deleteAnswer={deleteAnswer}
                    toggleCorrectAnswer = {toggleCorrectAnswer}
                />
            ))}
            <button onClick={addQuestion}>Add question</button>
            <div id="answer-option">
                <div className="option">
                    <input type="checkbox" />
                    <p>Random order</p>
                </div>
            </div>
            <button>Add survey</button>
        </div>
    );
}
