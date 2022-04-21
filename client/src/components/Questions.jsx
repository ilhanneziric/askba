import { useSelector, useDispatch } from 'react-redux';
import QuestionCard from './QuestionCard'

import { getQuestions, getQuestionsByUserId, getInitialQuestions, getInitialQuestionsByUserId } from '../redux/actions/questionsActions';
import { useEffect, useState } from "react";

import '../styles/profile.scss'

const Questions = ({isMyQuestions = false}) => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);
  const userId = useSelector(state => state.userId);

  const [offset, setOffSet] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    let hasMoree;
    !isMyQuestions ? hasMoree = dispatch(getQuestions(offset)) : (userId !== null && (hasMoree = dispatch(getQuestionsByUserId(offset))));
    setOffSet(state => state + 5);
    hasMoree.then((result) => setHasMore(result));
    
  }

  useEffect(() => {
    dispatch(getInitialQuestions());

    !isMyQuestions ? dispatch(getInitialQuestions()) : (userId !== null && dispatch(getInitialQuestionsByUserId()));
  }, []);

  return (
    <div>
      { questions !== undefined && (questions.map((q) => (<QuestionCard question={q} key={q.id}/>)))}

      {
        hasMore && 
        <div className="accountBtnContainer" style={{ margin: '1rem 0'}}>
          <button onClick={loadMore} className='logoutBtn' style={{width:'30%'}}>Load More</button>
        </div>
      }
    </div>
  )
}

export default Questions