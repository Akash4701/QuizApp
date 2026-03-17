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
    <div className="flex flex-col justify-center align-center gap-6 w-200 max-w-[90%] mx-auto mt-24 bg-[whitesmoke] rounded-xl px-8 py-10 box-border shadow-md space-y-6">

      <h1 className="text-xl text-center font-semibold">
        Attempt the Quiz
      </h1>

      <hr className="h-[2px] border-none bg-[#f7d3c9]" />

      {!result ? (
        <>
          <h2
            className="text-2xl font-medium leading-snug"
            dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.Question}` }}
          />

          <ul className="space-y-4 mt-4 flex flex-col gap-2 w-180">
            <li
              ref={A}
              onClick={(e) => checkAns(e, 1)}
              className="flex items-center min-h-[60px] px-4 border border-gray-400 rounded-lg text-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
              dangerouslySetInnerHTML={{ __html: question.options[0] }}
            />

            <li
              ref={B}
              onClick={(e) => checkAns(e, 2)}
              className="flex items-center min-h-[60px] px-4 border border-gray-400 rounded-lg text-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
              dangerouslySetInnerHTML={{ __html: question.options[1] }}
            />

            <li
              ref={C}
              onClick={(e) => checkAns(e, 3)}
              className="flex items-center min-h-[60px] px-4 border border-gray-400 rounded-lg text-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
              dangerouslySetInnerHTML={{ __html: question.options[2] }}
            />

            <li
              ref={D}
              onClick={(e) => checkAns(e, 4)}
              className="flex items-center min-h-[60px] px-4 border border-gray-400 rounded-lg text-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
              dangerouslySetInnerHTML={{ __html: question.options[3] }}
            />
          </ul>

          <button
            onClick={next}
            className="block mx-auto mt-4 w-[200px] h-[55px] bg-[#553f9a] text-white text-lg font-medium rounded-lg transition hover:scale-105"
          >
            Next
          </button>

          <div className="text-center text-sm text-gray-600">
            {index + 1} of {questions.length}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-semibold">
            You Scored {score} out of {questions.length * 2}
          </h2>

          <button
            onClick={reset}
            className="block mx-auto mt-4 w-[200px] h-[55px] bg-[#553f9a] text-white text-lg font-medium rounded-lg transition hover:scale-105"
          >
            Restart Quiz
          </button>
        </>
      )}

    </div>
  )
}

export default Quiz