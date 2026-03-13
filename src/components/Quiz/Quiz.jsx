import { useRef, useState, useEffect } from 'react'
import './quiz.css'

const Quiz = (props) => {

  const [questions, setQuestions] = useState([])
  const [index, setindex] = useState(0)
  const [question, setquestion] = useState(null)
  const [lock, setlock] = useState(false)
  const [score, setscore] = useState(0)
  const [result, setresult] = useState(false)

  let A = useRef(null)
  let B = useRef(null)
  let C = useRef(null)
  let D = useRef(null)

  let option_array = [A, B, C, D]

  // Fetching questions from API
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${props.num}&type=multiple&difficulty=${props.diff}&category=${props.cat}`)
      .then(res => res.json())
      .then(data => {

        const formatted = data.results.map(q => {

          const options = [...q.incorrect_answers, q.correct_answer]
          options.sort(() => Math.random() - 0.5)

          return {
            Question: q.question,
            options: options,
            Ans: options.indexOf(q.correct_answer) + 1
          }

        })

        setQuestions(formatted)
        setquestion(formatted[0])

      })
  }, [])

  //load time
  if (!question) {
    return <h2>Loading questions...</h2>
  }

  //Checking answer
  const checkAns = (e, ans) => {
    if (lock === false) {

      if (question.Ans === ans) {
        e.target.classList.add("correct")
        setlock(true)
        setscore(prevScore => prevScore + 2)

      } else {
        e.target.classList.add("incorrect")
        setlock(true)
        option_array[question.Ans - 1].current.classList.add("correct")
      }

    }
  }
  
  //Next question
  const next = () => {

    if (lock === true) {

      if (index === questions.length - 1) {
        setresult(true)
        return
      }

      const newIndex = index + 1
      setindex(newIndex)
      setquestion(questions[newIndex])
      setlock(false)

      option_array.forEach(option => {
        option.current.classList.remove("incorrect")
        option.current.classList.remove("correct")
      })

    }

  }

  //resetting the quiz
  const reset = () => {
    window.location.reload()
  }

  return (
    <div className="container">

      <h1>Attempt the Quiz</h1>
      <hr />

      {result ? null : (
        <>
          <h2 dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.Question}` }}></h2>

          <ul>
            <li ref={A} onClick={(e) => checkAns(e, 1)} dangerouslySetInnerHTML={{ __html: question.options[0] }}></li>
            <li ref={B} onClick={(e) => checkAns(e, 2)} dangerouslySetInnerHTML={{ __html: question.options[1] }}></li>
            <li ref={C} onClick={(e) => checkAns(e, 3)} dangerouslySetInnerHTML={{ __html: question.options[2] }}></li>
            <li ref={D} onClick={(e) => checkAns(e, 4)} dangerouslySetInnerHTML={{ __html: question.options[3] }}></li>
          </ul>

          <button onClick={next}>Next</button>

          <div className="index">{index + 1} of {questions.length}</div>
        </>
      )}

      {result && (
        <>
          <h2>You Scored {score} out of {questions.length * 2}</h2>
          <button onClick={reset}>Restart Quiz</button>
        </>
      )}

    </div>
  )
}

export default Quiz