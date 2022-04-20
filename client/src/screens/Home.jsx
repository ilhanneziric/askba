import { useEffect, useState } from "react";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import '../styles/home.scss'
import { getQuestions } from '../redux/actions/questionsActions';
import { useDispatch } from "react-redux";
import Questions from "../components/Questions";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [hotQuestions, setHotQuestions] = useState(null);
  const [hotUsers, setHotUsers] = useState(null);

  const getHotQuestions = async() => {
    const {data} = await axios.get("http://localhost:5000/api/question/hotquestions");
    setHotQuestions(data);
  }

  const getHotUsers = async() => {
    const {data} = await axios.get("http://localhost:5000/api/user/hotusers");
    setHotUsers(data);
  }

  useEffect(() => {
    dispatch(getQuestions());
    getHotQuestions();
    getHotUsers();
  }, [])
  
  return (
    <>
      <Header/>
      <div className="content">
      <div className="main-bar">
      <Questions/>
      </div>
        
      <div className="side-bar">
        <div className="hotusersbar">
          The most active users:
          { hotUsers !== null && (hotUsers.map((u) => (<div key={u.id} className='hotUser'>{(`${u.firstName} ${u.lastName}`.length) > 1 ? `${u.firstName} ${u.lastName}` : u.email}</div>)))}
        </div>
        <div className="inner-bar">
          Hot Questions:
          { hotQuestions !== null && (hotQuestions.map((q) => (<QuestionCard question={q} isHot={true} key={q.id}/>)))}
        </div>
      </div>
      </div>
      
    </>
  )
}

export default Home