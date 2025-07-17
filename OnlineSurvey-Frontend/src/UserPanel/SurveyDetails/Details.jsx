import "./Details.scss"


export default function Details({ surveyDetails }) {

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


    return (
        <>
            <div className="details-content">
                <h3><span>1.</span> {surveyDetails.questionDetails.questionName}</h3>
                <p>{surveyDetails.totalAnswerCount} out {surveyDetails.visitorsCount} people answered this question</p>

                <ul>
                    {surveyDetails.questionDetails.answers.map((e) => (
                        <li key={e.answerId}>
                            <div className="text-content">
                                <p>{e.answerName}</p>
                                <p>{e.choosenCount} resp.</p>
                                <p>{100 / surveyDetails.totalAnswerCount * e.choosenCount} %</p>
                            </div>
                            <div className="graphic-content">
                                <div className="empty">
                                    <div style={{width:`${100 / surveyDetails.totalAnswerCount * e.choosenCount}%`}} className="full"></div>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
                <button>Edit respones</button>

            </div>
        </>
    )
}