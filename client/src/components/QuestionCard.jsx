import '../styles/questionCard.scss';
import { updQuestion } from '../redux/actions/questionActions';
import { Link } from 'react-router-dom';

const QuestionCard = ({question}) => {
  return (
    <>
      {question !== undefined && 
        <Link to={`/question/${question.id}`}><div className='cardContainer'>
          <h1 className="cartTitle">{question.title}</h1>
        </div></Link>
      }
    </>
  )
}

export default QuestionCard