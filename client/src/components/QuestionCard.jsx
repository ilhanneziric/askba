import '../styles/questionCard.scss';

const QuestionCard = ({title}) => {
  return (
    <div className='cardContainer'>
        <h1 className="cartTitle">{title}</h1>
    </div>
  )
}

export default QuestionCard