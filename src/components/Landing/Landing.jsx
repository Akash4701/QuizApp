import Quiz from "../Quiz/Quiz"
import { useState } from "react";
import "./Landing.css";

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
    <div className="landing min-h-screen flex items-center justify-center bg-cover bg-center">

      {start ? (
        <Quiz diff={diff} cat={cat} num={num} />
      ) : (
        <div className="flex flex-col justify-center align-center text-center gap-4 bg-white/90 backdrop-blur-md w-200 h-100 p-8 rounded-xl shadow-2xl">
          <h1 className="font-extrabold text-2xl text-zinc-950">Welcome to the Quiz App</h1>
          <p className="font-bold text-xl text-zinc-950">Test your knowledge with our fun and interactive quizzes!</p>

          {/* Difficulty Dropdown */}
          <div className="dropdown mt-4 mb-4">
            <label className="block mb-2 font-bold">Select Difficulty:</label>
            <select value={diff} onChange={(e) => setDiff(e.target.value)} className="px-3 py-2 border border-gray-300 rounded">
              {diffs.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="dropdown mt-4 mb-4">
            <label className="block mb-2 font-bold">Select Category:</label>
            <select value={cat} onChange={(e) => setCat(Number(e.target.value))} className="px-3 py-2 border rounded">
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

          <button className="start-btn flex flex-row justify-center align-center p-4" onClick={() => setStart(true)}>
            <p className="p-4 w-30 h-8 bg-amber-950 text-amber-50 rounded-md">Start Quiz</p>
          </button>
        </div>
      )}

    </div>
  )
}

export default Landing