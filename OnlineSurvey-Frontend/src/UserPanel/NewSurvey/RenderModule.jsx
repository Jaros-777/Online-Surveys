import { useState } from "react";
import "./RenderModule.scss"

export default function RenderModule({ id, questionDetails, deleteQuestion, updateQuestion, updateAnswers, deleteAnswer, toggleCorrectAnswer }) {
    const { questionName, type, answers } = questionDetails;

    const handleInputChange = (e) => {
        updateQuestion(id, "questionName", e.target.value);
    };

    const handleAnswersChange = (answerId, value) => {
        updateAnswers(id, answerId, value);
    };

    const handleDeleteAnswer = (answerId) => {
        deleteAnswer(id, answerId);
    }

    const handleCorrectChange = (answerId, isChecked) => {
        toggleCorrectAnswer(id, answerId, isChecked);
    };


    return (
        <div className="render-module">
            <div id="deleteQuestion">
                <button onClick={() => deleteQuestion(id)}>X</button>
            </div>

            <p style={{margin:"1rem 0"}} >Question</p>
            <input
                type="text"
                placeholder="Enter your question"
                onChange={handleInputChange}
                value={questionName}
            />

            <div id="answer-type">
                <button style={type === "single" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(id, "type", "single")} className="simple-button">Single correct answer</button>
                <button style={type === "multiple" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(id, "type", "multiple")} className="simple-button">Multiple correct answer</button>
                <button style={type === "open" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(id, "type", "open")} className="simple-button">Open question</button>
                <button style={type === "any" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(id, "type", "any")} className="simple-button">Witchout correct answer</button>
                {/* <div className="type">
                    <input
                        type="radio"
                        name={`type-${id}`}
                        checked={type === "single"}
                        onChange={() => updateQuestion(id, "type", "single")}
                    />
                    <p>Single answer</p>
                </div>
                <div className="type">
                    <input
                        type="radio"
                        name={`type-${id}`}
                        checked={type === "multiple"}
                        onChange={() => updateQuestion(id, "type", "multiple")}
                    />
                    <p>Multiple answers</p>
                </div>
                <div className="type">
                    <input
                        type="radio"
                        name={`type-${id}`}
                        checked={type === "open"}
                        onChange={() => updateQuestion(id, "type", "open")}
                    />
                    <p>Open answer</p>
                </div>
                <div className="type">
                    <input
                        type="radio"
                        name={`type-${id}`}
                        checked={type === "any"}
                        onChange={() => updateQuestion(id, "type", "any")}
                    />
                    <p>Any answer</p>
                </div> */}
            </div>

            {/* <div id="info">
                <p>Choose good {type === "single" ? "answer" : "answers"} in checkbox</p>
            </div> */}

            {type !== "open" && (
                <>
                    {answers.map((e) => (
                        <div key={e.answerId} className="answer">
                            <input
                                type="text"
                                placeholder="Answer"
                                value={e.answerName}
                                onChange={(ev) => handleAnswersChange(e.answerId, ev.target.value)}
                            />
                            {(type === "any" ? null : <input name={`correct-${id}`} onChange={(ev) => handleCorrectChange(e.answerId, ev.target.checked)} checked={questionDetails.correctAnswers.includes(e.answerId)} type={type === "single" ? "radio" : "checkbox"} />)}

                            <button onClick={() => handleDeleteAnswer(e.answerId)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={() => {
                        const newAnswer = {
                            answerId: Date.now(),
                            answerName: ""
                        };
                        updateQuestion(id, "answers", [...answers, newAnswer]);
                    }}>Add new answer</button>
                </>
            )}

        </div>
    );
}