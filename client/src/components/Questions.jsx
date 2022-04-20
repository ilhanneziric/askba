import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import QuestionCard from './QuestionCard'


const Questions = () => {
  const questions = useSelector(state => state.questions);
  

  return (
    <div>
      { questions.questions !== undefined && (questions.questions.map((q) => (<QuestionCard question={q} key={q.id}/>)))}
    </div>
  )
}

export default Questions