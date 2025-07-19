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

    return (
        <div id="question-container">
                <h1>{question.questionDetails.questionName}</h1>
                {question.questionDetails.type === "open" ?
                    <textarea name="" id=""></textarea>
                    :
                    <ul>
                        {question.questionDetails.answers.map((e) => (
                            <li key={e.answerId}>
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