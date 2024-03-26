import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from "../../assets/data"

function quiz() {
  let[index,setindex]=useState(0);
  let [question,setquestion]=useState(data[index])
  let[lock,setlock]=useState(false);
  let[score,setscore]=useState(0);
  let[result,setresult]=useState(false);

  let A=useRef(null);
  let B=useRef(null);
  let C=useRef(null);
  let D=useRef(null);
  let option_array=[A,B,C,D];


  const checkAns=(e,ans)=>{
    if(lock==false){
    if(question.Ans===ans){
      e.target.classList.add("correct");
      setlock(true);
      setscore((prevScore) => prevScore+2);
    }else{
      e.target.classList.add("incorrect"); 
      setlock(true);
      option_array[question.Ans-1].current.classList.add("correct");
    }
  }
}
const next=()=>{
  if(lock===true){
    if(index===data.length-1){
      setresult(true);
      return 0;
    }

    setindex(++index);
    setquestion(data[index]);
    setlock(false);
    option_array.map((option)=>{
      option.current.classList.remove("incorrect");
      option.current.classList.remove("correct");
      return null;

    })
  }
}
const reset=()=>{
  setindex(0);
  setquestion(data[0]);
  setscore(0);
  setlock(false);
  setresult(false);
}

  return (
    <>
    <div  className="container">
    <h1>Attempt the Quiz</h1>
    <hr/>
    {result?<></>:<>
    <h2>{index+1}.{question.Question}</h2>
    <ul>
    <li ref={A} onClick={(e)=>{checkAns(e,1)}}>{question.A}</li>
    <li ref={B} onClick={(e)=>{checkAns(e,2)}}>{question.B}</li>
    <li ref={C} onClick={(e)=>{checkAns(e,3)}}>{question.C}</li>
    <li ref={D} onClick={(e)=>{checkAns(e,4)}}>{question.D}</li>
    </ul>
    <button onClick={next}>Next</button>
    <div className='index'>{index+1} of {data.length}</div>
    </>}
    {result?<><h2>You Scored {score} out of {data.length*2}</h2>
    <button onClick={reset}>Reset</button></>:<></>}
    
   </div>
   
    </>
  )
}

export default quiz