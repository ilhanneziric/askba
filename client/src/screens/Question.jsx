import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import '../styles/question.scss'
import '../styles/inputs.scss'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { toast } from "react-toastify";
import { answerValidation } from "../validations";
import { getQuestion } from "../redux/actions/questionActions";
import { like, deleteLike} from '../redux/actions/likeActions';

const Question = () => {
  const dispatch = useDispatch();
  const question = useSelector(state => state.question);
  // const [question, setQuestion] = useState({});
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const userid = useSelector(state => state.userId);
  const [answer, setAnswer] = useState('');
  const params = useParams();
  const [editing, setEditing] = useState(null);
  // const [author, setAuthor] = useState('');
  // setAuthor(`${question.User?.firstName} ${question.User?.lastName}`);

  const onChange = e => {
    setAnswer(e.target.value);
  }

  const onSubmitFormAnswer = async() => {
    const { error } = answerValidation({text: answer});
    if(error){
        toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
    }else{
      const body = {
        text: answer,
        userId: userid,
        questionId: question.id
      }
      await axios.post('http://localhost:5000/api/answer', body,{
        headers: {token: localStorage.token}
      });
      toast.success('Answer added successfully!');
      setAnswer('');
      dispatch(getQuestion(params.id));
    }
  }

  const onSubmitFormSaveChanges = async() => {
    const { error } = answerValidation({text: answer});
    if(error){
        toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
    }else{
      const body = {
        text: answer,
        userId: userid,
        questionId: question.id
      }
      await axios.put(`http://localhost:5000/api/answer/${editing.id}`, body,{
        headers: {token: localStorage.token}
      });
      toast.success('Answer changed successfully!');
      dispatch(getQuestion(params.id));
      cancelEditing();
    }
  }

  const onSubmitForm = async(isEdit = false) => {
    const { error } = answerValidation({text: answer});
    if(error){
        toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
    }else{
      const body = {
        text: answer,
        userId: userid,
        questionId: question.id
      }
      try {
        if(isEdit){
          await axios.put(`http://localhost:5000/api/answer/${editing.id}`, body,{
            headers: {token: localStorage.token}
          });
          toast.success('Answer changed successfully!');
        }else{
          await axios.post('http://localhost:5000/api/answer', body,{
            headers: {token: localStorage.token}
          });
          toast.success('Answer added successfully!');
        }
        dispatch(getQuestion(params.id));
        cancelEditing();
      } catch (err) {
        toast.error(err.response.data);
      }
    }
  }

  const setEdit = (a) => {
    setAnswer(a.text);
    setEditing(a);
  }

  const deleteAnswer = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/answer/${id}`, {
        headers: {token: localStorage.token}
      });
      toast.success('Answer deleted successfully!')
      dispatch(getQuestion(params.id));
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  const cancelEditing = () => {
    setEditing(null)
    setAnswer('');
  };

  useEffect(() => {
    dispatch(getQuestion(params.id));
  }, [])

  return (
    <>
      {question !== null &&
      <>
      <Header/>
      <div className="qContainer">
        <div className="qtitle">{question.title}</div>
        <p className="qdescription">{question.description}</p>
        {`${question.User?.firstName} ${question.User?.lastName}`.length > 0 && <p className="author">Asked by: {`${question.User?.firstName} ${question.User?.lastName}`}</p>}
        {/* {author.length > 0 && <p>Asked by: {author}</p>} */}
        <div className="questionLikesContainer">

              {question.Likes?.filter((l) => l.userId === userid && l.isDislike === false).length > 0 ? 
                <AiFillLike className="answerIcon questionIcon" onClick={() => dispatch(deleteLike())}/> 
              :
                <AiOutlineLike className="answerIcon questionIcon" onClick={() => dispatch(like(false))}/> 
              }
              <div className="answerLikes" style={{margin: '0 2px'}}>{question.Likes?.filter((l) => l.isDislike === false).length}</div>
              
              {question.Likes?.filter((l) => l.userId === userid && l.isDislike === true).length > 0 ? 
                <AiFillDislike className="answerIcon questionIcon" onClick={() => dispatch(deleteLike())}/> 
              :
                <AiOutlineDislike className="answerIcon questionIcon" onClick={() => dispatch(like(true))}/> 
              }              
              <div className="answerLikes" style={{margin: '0 2px'}}>{question.Likes?.filter((l) => l.isDislike === true).length}</div>
        </div>
      </div>
    </>
      }
      {isAuthenticated && (
        <div className="qContainer">
        <label htmlFor="asnwer" className="logRegLbl">Your answer:</label>
        <textarea type="text" name="description" required className="logRegInput" value={answer} onChange={e => onChange(e)} style={{ width: '100%', height: '4em', marginBottom: '0'}}/>
        {
          editing === null ? <button className="answerBtn" onClick={() => onSubmitForm(false)}>Answer</button> : <>
            <button className="editbtn" onClick={() => onSubmitForm(true)}>Save Changes</button>
            <button className="editbtn" onClick={cancelEditing}>Cancel</button>
            </>
        }
        <br /><br />
      </div>
      )}

      {
        question?.Answers !== undefined &&
        question.Answers.map((a) => (

          <div className="aContainer" key={a.id}>
             <div className="aContainerLeft">
               <div className="atext">{a.text}</div>
               {`${a.User?.firstName} ${a.User?.lastName}`.length > 0 && <p className="author">Answered by: {`${a.User?.firstName} ${a.User?.lastName}`}</p>}
             </div>
             <div className="aContainerRight">

             {a.userId === userid && <div className="editDeleteIcons">
                <div className="answerLikes" style={{visibility: 'hidden'}}>50</div>
                <AiOutlineEdit className="answerIcon" onClick={() => setEdit(a)}/>
                <AiOutlineDelete className="answerIcon" onClick={() => deleteAnswer(a.id)}/>
                <div className="answerLikes" style={{visibility: 'hidden'}}>50</div>
                <hr style={{width: '100%', margin: '2px'}}/>
                </div>
              }

              {a.Likes?.filter((l) => l.userId === userid && l.isDislike === false).length > 0 ? 
                <AiFillLike className="answerIcon" onClick={() => dispatch(deleteLike(a))}/> 
              :
                <AiOutlineLike className="answerIcon" onClick={() => dispatch(like(false, a))}/> 
              }
              <div className="answerLikes" style={{margin: '0 2px'}}>{a.Likes?.filter((l) => l.isDislike === false).length}</div>
              
              {a.Likes?.filter((l) => l.userId === userid && l.isDislike === true).length > 0 ? 
                <AiFillDislike className="answerIcon" onClick={() => dispatch(deleteLike(a))}/> 
              :
                <AiOutlineDislike className="answerIcon" onClick={() => dispatch(like(true, a))}/> 
              }              
              <div className="answerLikes" style={{margin: '0 2px'}}>{a.Likes?.filter((l) => l.isDislike === true).length}</div>
            </div>
             
          </div>        
        ))
      }

    </>
  )
}

export default Question