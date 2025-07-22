import { useParams } from "react-router-dom"
import "./Survey.scss"
import { useState } from "react";

export default function Question({ chooseAnswer, question }) {


    // {
    //         id: 0,
    //         visitorsCount: 2,
    //         totalAnswerCount: 2,
    //         questionDetails: {
    //             questionName: "Najlepszy fast-food",
    //             type: "single",
    //             answers: [
    //                 {
    //                     answerId: 0,
    //                     answerName: "Pizza",
    //                    choosenCount: 0,
    
    //                 },
    //                 {
    //                     answerId: 1,
    //                     answerName: "Kebab",
    //                    // choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 2,
    //                     answerName: "Hamburger",
    //                    choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 3,
    //                     answerName: "Hot-dog",
    //                    choosenCount: 0,
    //                 },
    //             ],
    //             correctAnswers: [1]
    //         }
    //     }

    const fetchSurvey = async () => {
        // fetch public survey
        id
    }

    const handleChooseAnswer = (answerId, value) => {
        chooseAnswer(answerId, value);
    }

    console.log(question)

    return (
        <div id="question-container">
                <h1>{question.name}</h1>
                {question.type == "open" ?
                    <textarea name="" id=""></textarea>
                    :
                    <ul>
                        {question.answers.map((e) => (
                            <li key={e.id}>
                                <button onClick={() => handleChooseAnswer(e.id, null)} id="answer">
                                    {e.answerName}
                                </button>
                            </li>
                        ))}
                    </ul>
                }
        </div>
    )
}