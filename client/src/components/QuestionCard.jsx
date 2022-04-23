import '../styles/questionCard.scss';
import { updQuestion } from '../redux/actions/questionActions';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const QuestionCard = ({question}) => {
  const dispatch = useDispatch();
  return (
    <>
      {question !== undefined && 
        <Link to={`/question/${question.id}`}>
          {
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