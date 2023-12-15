import { useEffect, useState } from "react"

export default function Question(props) {
    const [formData, setFormData] = useState([

        { answer: "", selected: "" }, // For question 1
        { answer: "", selected: "" }, // For question 2
        { answer: "", selected: "" }, // For question 3
        { answer: "", selected: "" }, // For question 4
        { answer: "", selected: "" }, // For question 5

    ])

    const [quizOver, setQuizOver] = useState(false)
    const [totalCorrect, setTotalCorrect] = useState(0)

    useEffect(() => {
        setQuizOver(false)
        
        const updatedFormData = props.data.map((item, index) => ({
            answer: item.answer,
            selected: formData[index]?.selected || ""
        }))
        setFormData(updatedFormData)

    }, [props.data]);
    

    function handleRadioChange(questionIndex, value) {
        setFormData((prevData) => 
            prevData.map((item, index) => 
                index === questionIndex
                ? {...item, selected: value}
                : item
            )
        )

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuizOver(true)
        let correctCount = 0;
        formData.forEach((item) => {
            if (item.answer === item.selected) {
                correctCount++
            }
        })
        setTotalCorrect(correctCount)
        
    }


    const questionElements = props.data.map((data, index) => (
        <div className="question-container">
            <h2 className="question-heading">{data.question}</h2>
            <div className="question-choices">
                {data.choices.map((item, choiceIndex) => (
                    <div>
                        <input className="choice"
                               type="radio" 
                               id={`q${index+1}-choice${choiceIndex+1}`}
                               name={`question${index+1}`} 
                               value={item}
                               onChange={() => handleRadioChange(index, item)} 
                               
                               />
                        <label style={{
                            backgroundColor: // Sets the background color to show answers after the quiz is submitted
                                quizOver && 
                                formData[index]?.answer === item
                                ? "#94D7A2"  // Sets correct answer to Green
                                : 
                                quizOver &&
                                formData[index]?.selected !== formData[index].answer && formData[index]?.selected === item
                                ? "#F8BCBC"  // Sets incorrect user selected item to Red
                                : "",
                            opacity:
                                quizOver && formData[index]?.answer !== item 
                                ? "0.5"
                                : "1", 
                            border:
                                quizOver && formData[index]?.answer === item || formData[index]?.selected === item
                                ? "1px solid transparent"
                                : "1px solid #4D5B9E"
                        }}
                               className="choice-label" 
                               htmlFor={`q${index+1}-choice${choiceIndex+1}`}>
                                {item}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    ))


    return (
        <form onSubmit={handleSubmit} className="all-questions">
            {!quizOver ? (
                <div>
                    {questionElements}
                    <button className="btn check-btn">Check answers</button> 
                </div>
                
            ): <div>
                    {questionElements}
                    <div className="play-again-container">
                        <h2 className="score-text">You scored {totalCorrect}/5 correct answers</h2>
                        <button onClick={props.playAgain} className="btn play-again-btn">Play Again</button>
                    </div>
                </div>
                }
            
        </form>
    )
}
