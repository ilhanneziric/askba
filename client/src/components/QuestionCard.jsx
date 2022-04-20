import '../styles/questionCard.scss';
import { updQuestion } from '../redux/actions/questionActions';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const QuestionCard = ({question, isHot = false}) => {
  const dispatch = useDispatch();
  return (
    <>
      {question !== undefined && 
        <Link to={`/question/${question.id}`}>
          {
            isHot ?  
              <div className='cardContainerHot' onClick={() => dispatch(updQuestion(question))}>
                <div className="cartTitleHot">{question.title}</div>
              </div>
            :
              <div className='cardContainer' onClick={() => dispatch(updQuestion(question))}>
                <div className="cartTitle">{question.title}</div>
              </div>
          }
          
        </Link>
      }
    </>
  )
}

export default QuestionCard