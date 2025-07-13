import "./RenderModule.scss"

export default function RenderModule({ id, questionDetails, deleteQuestion, updateQuestion, updateAnswers, deleteAnswer, toggleCorrectAnswer }) {
    const { questionName, type, answers } = questionDetails;

    const handleInputChange = (e) => {
        updateQuestion(id, "questionName", e.target.value);
    };

    const handleAnswersChange = (answerId, value) => {
        updateAnswers(id, answerId, value);
    };

    const handleDeleteAnswer =(answerId)=>{
        deleteAnswer(id , answerId);
    }

    const handleCorrectChange = (answerId, isChecked) => {
    toggleCorrectAnswer(id, answerId, isChecked);
};


    

    return (
        <div className="render-module">
            <div id="deleteQuestion">
                <button onClick={() => deleteQuestion(id)}>X</button>
            </div>

            <input
                type="text"
                placeholder="Your question"
                onChange={handleInputChange}
                value={questionName}
            />

            <div id="answer-type">
                <div className="type">
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
            </div>

            <div id="info">
                <p>Choose good {type === "single" ? "answer" : "answers"} in checkbox</p>
            </div>

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
                            <input name={`correct-${id}`} onChange={(ev) => handleCorrectChange(e.answerId, ev.target.checked)} checked={questionDetails.correctAnswers.includes(e.answerId)} type={type === "single" ? "radio" : "checkbox"} />
                            <button onClick={()=>handleDeleteAnswer(e.answerId)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={() => {
                        const newAnswer = {
                            answerId: Date.now(),
                            answerName: ""
                        };
                        updateQuestion(id, "answers", [...answers, newAnswer]);
                    }}>Add</button>
                </>
            )}

        </div>
    );
}