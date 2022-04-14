import { useEffect } from "react";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import '../styles/home.scss'
import { getQuestions } from '../redux/actions/questionsActions';
import { useDispatch, useSelector } from "react-redux";

const Home = ({isAuthenticated}) => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions);

  useEffect(() => {
    dispatch(getQuestions());
  }, [])
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated}/>
      <div className="content">
      <div className="main-bar">
      { questions.questions !== undefined ? (questions.questions.map((q) => (<QuestionCard title={q.title} key={q.id}/>))) : (<></>)}
      </div>
        
      <div className="side-bar">
        
        <div className="inner-bar">
        I am the King!
        I am the King!
        I am the King!
        I am the King!
        I am the King!
        I am the King!
        </div>
        <div className="inner-bar">

        </div>
      </div>
      </div>
      
    </>
  )
}

export default Home