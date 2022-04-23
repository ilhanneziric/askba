import { useEffect } from "react";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import '../styles/home.scss'
import { useDispatch, useSelector } from "react-redux";
import Questions from "../components/Questions";
import { getHotters } from "../redux/actions/hottersActions";

const Home = () => {
  const dispatch = useDispatch();
  const {users, questions} = useSelector(state => state.hotters);

  useEffect(() => {
    dispatch(getHotters());
  }, [])
  
  return (
    <>
      <Header/>
      <div className="content">
      <div className="main-bar">
      Recently added questions:
      <Questions/>
      </div>
        
      <div className="side-bar">
        <div className="inner-bar">
          The most active users:
          { users !== null && (users.map((u) => (<div key={u.id} className='hotUser'>{(`${u.firstName} ${u.lastName}`.length) > 1 ? `${u.firstName} ${u.lastName}` : u.email}</div>)))}
        </div>
        <div className="inner-bar">
          Hot Questions:
          { questions !== null && (questions.map((q) => (<QuestionCard question={q} key={q.id}/>)))}
        </div>
      </div>
      </div>
      
    </>
  )
}

export default Home