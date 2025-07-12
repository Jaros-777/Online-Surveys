import { useState } from "react"
import "./AddNewSurvey.scss"

export default function AddNewSurvey() {

    const [modulList, setModuleList] = useState([
        {
            id: Date.now(),
            questionDetails: {
                questionName: "Pierwsze",
                type: "single",
                answerCount: 1,
                answers: [],
                correctAnswers: []
            }

        }
    ])
    const [questionsList, setQuestionsList] = useState([
        {
            id: 0,
            name: "Pytanie 1",
            type: "single",
            allAnswers: [
                "pies",
                "kot",
                "rybka"
            ],
            correctAnswer: [
                "pies"
            ]
        }
    ])

    const deleteQuestion = (idToRemove) => {
        setModuleList(prevList => prevList.filter(q => q.id !== idToRemove))
    }

    function RenderModule(props) {
        // 1 odpowiedz
        // kilka odpowiedzi
        // otwarte

        const [option, setOption] = useState("single");
        const [answerCount, setAnswerCount] = useState(1);
        const [details, setDetails] = useState({
            id: props.id,
            questionName: props.questionDetails.questionName,
            type: "",
            answerCount: 1,
            answers: [],
            correctAnswers: []
        })


        const updateQuestion = (val, option) => {
            props.setModuleList(prev => ({ ...prev, questionDetails:{[option]: val} }));
        };

        return (
            <div key={props.id} className="render-module">
                <div id="deleteQuestion">
                    <button onClick={() => props.deleteQuestion(props.id)}>X</button>
                </div>
                <input type="text" placeholder="Your question" onChange={(e) => updateQuestion(e.target.value, "questionName")} value={props.questionDetails.questionName} />
                <div id="answer-type">
                    <div className="type">
                        <input type="checkbox" />
                        <p>Single answer</p>
                    </div>
                    <div className="type">
                        <input type="checkbox" />
                        <p>Multiple answers</p>
                    </div>
                    <div className="type">
                        <input type="checkbox" />
                        <p>Open answer</p>
                    </div>
                </div>
                {option != "open" ?
                    Array.from({ length: answerCount }, (_, index) => {
                        <div key={index} className="answer">
                            <input type="text" />
                            <input type="checkbox" />
                        </div>
                    })
                    : null
                }
            </div>
        )
    }

    const addQuestion = (id) => {
        setModuleList(prev => [
            ...prev,
            {
                id: Date.now(),
                questionDetails: {
                questionName: "",
                type: "single",
                answerCount: 1,
                answers: [],
                correctAnswers: []
            }
            }
        ]);

    }

    return (
        <>
            <div id="new-survey-container">
                {modulList.map((e) => (<RenderModule key={e.id} id={e.id} setModuleList={setModuleList} questionDetails={e.questionDetails} deleteQuestion={deleteQuestion}></RenderModule>))}
                <button onClick={() => addQuestion()}>Add question</button>
            </div>

        </>
    )
}