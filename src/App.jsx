import { useState, useEffect } from 'react'
import blobBottom from './assets/blob-bottom.png'
import blobTop from './assets/blob-top.png'
import './App.css'
import he from 'he';
import Question from './components/Question';

function App() {
  const [questions, setQuestions] = useState([])

  function getData() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        const questionsArr = getQuestionsObj(data.results)

        setQuestions(questionsArr)
      })
  }

  function getQuestionsObj(dataArr) {
    const questionsArr = []
    
    for (let result of dataArr) {
      const decodedQuestion = he.decode(result.question)
      const correctAnswer = result.correct_answer
      let choicesArr = result.incorrect_answers 
      insertRandomly(choicesArr, correctAnswer)
      choicesArr = choicesArr.map(choice => he.decode(choice))

      questionsArr.push({
        question: decodedQuestion,
        answer: correctAnswer,
        choices: choicesArr
      })

    }

    return questionsArr
  }


  function insertRandomly(arr, itemToInsert) {
    const randomIndex = Math.floor(Math.random() * (arr.length + 1))
    arr.splice(randomIndex, 0, itemToInsert)
  }

  function playAgain() {
    setQuestions([])
    getData()
  }


  return (
    <>
      {questions.length ? (
        <div className="container">
          <img className="blob-top" src={blobTop} alt="" />
          <Question data={questions} playAgain={playAgain}/>
          <img className="blob-bottom" src={blobBottom} alt="" />
        </div>
      ) : (
        <div>
          <img className="blob-top" src={blobTop} alt="" />
          <div className="start-menu">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">Test Your Trivia Skills!</p>
            <button className="start-btn" onClick={getData}>Start quiz</button>
          </div>
          <img className="blob-bottom" src={blobBottom} alt="" />
        </div>
      )}
    </>
  )
}

export default App
