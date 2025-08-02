import { useLocation, useParams } from "react-router-dom"
import "./Details.scss"


export default function Details({ index, question, totalAttempts }) {

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
    //                     choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 1,
    //                     answerName: "Kebab",
    //                     choosenCount: 0,
    //                 },
    //                 {
    //                     answerId: 2,
    //                     answerName: "Hamburger",
    //                     choosenCount: 1,
    //                 },
    //                 {
    //                     answerId: 3,
    //                     answerName: "Hot-dog",
    //                     choosenCount: 1,
    //                 },
    //             ],
    //             correctAnswers: [1]
    //         }
    //     }

    let answeredCount = 0;
    for (let i in question.answers) {
        answeredCount = answeredCount + question.answers[i].chosenCount;
    }

    // console.log(question)
    return (
        <>
            <div className="details-content">
                <h3><span>{index}</span> {question.name}</h3>
                <p>{answeredCount} out {totalAttempts} people answered this question</p>

                <ul>
                    {question.answers.map((e) => (
                        <li key={e.id}>

                            {question.type !== "open" ?
                                <>
                                    <div className="text-content">
                                        <p>{e.answerName}</p>
                                        <p>{e.chosenCount} resp.</p>
                                        <p>{answeredCount > 0 ? Math.round(100 / answeredCount * e.chosenCount) : 0} %</p>
                                    </div>
                                    <div className="graphic-content">
                                        <div style={ question.correctAnswer.includes(e.id) ? { backgroundColor:"rgb(173, 216, 230)"} : null} className="empty">
                                            <div style={{ width: `${answeredCount > 0 ? Math.round(100 / answeredCount * e.chosenCount) : 0}%`}} className="full"></div>
                                        </div>

                                    </div>
                                </> 
                                :
                                e.answerName.length > 0 ?
                                <div className="openQuestion">
                                    <p>{e.answerName}</p>
                                    
                                </div>
                                : null
                            }
                        </li>
                    ))}
                </ul>
                <button>Edit respones</button>

            </div>
        </>
    )
}