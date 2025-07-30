import { useState } from "react";
import "./RenderModule.scss"

export default function RenderModule({ id, question, deleteQuestion, updateQuestion, updateAnswers, deleteAnswer, toggleCorrectAnswer }) {
    // const { questionName, type, answers } = questionDetails;
    // console.log(question)
    // console.log(question.id)

    // const handleInputChange = (e) => {
    //     updateQuestion(id, e.target.value);
    // };

    // const handleAnswersChange = (answerId, value) => {
    //     updateAnswers(id, answerId, value);
    // };

    const handleDeleteAnswer = (answerId) => {
        deleteAnswer(id, answerId);
    }

    const handleCorrectChange = (answerId, isChecked) => {
        toggleCorrectAnswer(id, answerId, isChecked);
    };


    return (
        <div className="render-module">
            <div id="deleteQuestion">
                <button onClick={() => deleteQuestion(question.id)}>X</button>
            </div>

            <p style={{margin:"1rem 0"}} >Question</p>
            <input
                type="text"
                placeholder="Enter your question"
                onChange={(e)=>updateQuestion(question.id,"name", e.target.value)}
                value={question.name}
            />

            <div id="answer-type">
                <button style={question.type === "single" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(question.id, "type", "single")} className="simple-button">Single correct answer</button>
                <button style={question.type === "multiple" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(question.id, "type", "multiple")} className="simple-button">Multiple correct answer</button>
                <button style={question.type === "open" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(question.id, "type", "open")} className="simple-button">Open question</button>
                <button style={question.type === "any" ? {backgroundColor:"var(--darker-grey)"} : null} onClick={() => updateQuestion(question.id, "type", "any")} className="simple-button">Witchout correct answer</button>
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

            {question.type !== "open" && (
                <>
                    {question.answers.map((e) => (
                        <div key={e.id} className="answer">
                            <input
                                type="text"
                                placeholder="Answer"
                                value={e.answerName}
                                onChange={(ev) => updateAnswers(question.id, e.id, ev.target.value)}
                            />
                            {(question.type === "any" ? null : <input name={`correct-${question.id}`} onChange={(ev) => handleCorrectChange(question.id, e.id, ev.target.checked)} checked={question.correctAnswer.includes(e.id)} type={question.type === "single" ? "radio" : "checkbox"} />)}

                            <button onClick={() => deleteAnswer(question.id, e.id)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={() => {
                        const newAnswer = {
                            id: Date.now(),
                            answerName: "",
                            chosenCount:0
                        };
                        updateQuestion(question.id, "answers", [...question.answers, newAnswer]);
                    }}>Add new answer</button>
                </>
            )}

        </div>
    );
}