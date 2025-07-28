import "./Survey.scss"
import "./Question.scss"
import { useState } from "react"

export default function Question({ chooseAnswer, question }) {

    const [chosenAnswers, setChosenAnswers] = useState([])

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
        chooseAnswer(question.id, answerId, value);
        
        question.type === "multiple"
    ? setChosenAnswers(prev => {
        const updated = prev.includes(answerId)
            ? prev.filter(id => id !== answerId)
            : [...prev, answerId];
        
        return updated;
      })
    : setChosenAnswers(prev => {
        const updated = prev.includes(answerId)
            ? prev.filter(id => id !== answerId)
            : [answerId];
        
        return updated;
      });

       
    }


    return (
        <div id="question-container">
                <h1>{question.name}</h1>
                {question.type == "open" ?
                    <textarea value={chooseAnswer[0]} onChange={(e)=>handleChooseAnswer(null, e.target.value)}></textarea>
                    :
                    <ul>
                        {question.answers.map((e) => (
                            <li key={e.id}>
                                <button style={chosenAnswers.includes(e.id) ? {backgroundColor:"red"}:null} onClick={() => handleChooseAnswer(e.id, null)} id="answer">
                                    {e.answerName}
                                </button>
                            </li>
                        ))}
                    </ul>
                }
        </div>
    )
}