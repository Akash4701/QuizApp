import "./landing.css"
import Quiz from "../Quiz/Quiz"
import { useState } from "react";

const Landing = () => {
  // difficulty level
  const diffs = ["easy", "medium", "hard"];
  const [diff, setDiff] = useState(diffs[0]);

  //categories
  const cats = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" }
  ];
  const [cat, setCat] = useState(cats[0].id);

  //number of questions
  const [num, setNum] = useState(10);

  //state of quiz
  const [start, setStart] = useState(false);

  return (
    <div className="landing">

      {start ? (
        <Quiz diff={diff} cat={cat} num={num} />
      ) : (
        <>
          <h1>Welcome to the Quiz App</h1>
          <p>Test your knowledge with our fun and interactive quizzes!</p>

          {/* Difficulty Dropdown */}
          <div className="dropdown">
            <label>Select Difficulty:</label>
            <select value={diff} onChange={(e) => setDiff(e.target.value)}>
              {diffs.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="dropdown">
            <label>Select Category:</label>
            <select value={cat} onChange={(e) => setCat(Number(e.target.value))}>
              {cats.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Questions */}
          <div className="num-questions">
            <label>Number of Questions:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={num}
              onChange={(e) => setNum(parseInt(e.target.value))}
            />
          </div>

          <button className="start-btn" onClick={() => setStart(true)}>
            Start Quiz
          </button>
        </>
      )}

    </div>
  )
}

export default Landing