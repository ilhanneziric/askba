import { useSelector, useDispatch } from 'react-redux';
import QuestionCard from './QuestionCard'

import { getQuestions, getQuestionsByUserId, getInitialQuestions, getInitialQuestionsByUserId } from '../redux/actions/questionsActions';
import { useEffect, useState } from "react";

import '../styles/profile.scss'
import { updOffset } from '../redux/actions/offsetActions';

const Questions = ({isMyQuestions = false}) => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);
  const userId = useSelector(state => state.userId);

  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    let hasMoree;
    !isMyQuestions ? hasMoree = dispatch(getQuestions()) : (userId !== null && (hasMoree = dispatch(getQuestionsByUserId())));
    dispatch(updOffset());
    hasMoree.then((result) => setHasMore(result));
    
  }

  useEffect(() => {
    let hasMoree;
    !isMyQuestions ? hasMoree = dispatch(getInitialQuestions()) : (userId !== null && (hasMoree = dispatch(getInitialQuestionsByUserId())));
    hasMoree.then((result) => setHasMore(result));
  }, []);

  return (
    <div>
      { questions !== undefined && questions?.length !== 0 ? (questions?.map((q) => (<QuestionCard question={q} key={q.id}/>))) : <p>You have no questions!</p>}
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