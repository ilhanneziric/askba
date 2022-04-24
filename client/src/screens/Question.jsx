import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import '../styles/question.scss'
import '../styles/inputs.scss'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { getQuestion } from "../redux/actions/questionActions";
import { like, deleteLike} from '../redux/actions/likeActions';
import DeleteQuestion from "../components/DeleteQuestion";
import AddEditQuestion from "../components/AddEditQuestion";
import { getUser } from "../redux/actions/userActions";
import Answers from "../components/Answers";
import { addAnswer, deleteAnswer, editAnswer } from "../redux/actions/answerActions";

const Question = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const dispatch = useDispatch();
  const question = useSelector(state => state.question);
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

  const onSubmitForm = async(isEdit = false) => {
    isEdit ? dispatch(editAnswer(answer, editing.id)) : dispatch(addAnswer(answer));
    cancelEditing();
  }

  const setEdit = (a) => {
    setAnswer(a.text);
    setEditing(a);
  }
  
  const cancelEditing = () => {
    setEditing(null)
    setAnswer('');
  };

  useEffect(() => {
    dispatch(getQuestion(params.id));
    userid !== null && dispatch(getUser(userid));
  }, [userid, dispatch, params.id])

  return (
    <>
      {question !== null &&
      <>
      <Header/>
      <div className="qContainer">
        <div className="qtitle">{question.title}</div>
        {question.userId === userid && <div className="editDeleteIconsQuestion">
            <DeleteQuestion show={show} handleClose={handleClose}/>
            <AddEditQuestion show={showEdit} handleClose={handleCloseEdit} handleShow={handleShowEdit} isEdit={true}/>
            <AiOutlineEdit className="answerIcon questionIcon" onClick={handleShowEdit}/>
            <AiOutlineDelete className="answerIcon questionIcon" onClick={handleShow}/>
          </div>
        }
        <p className="qdescription">{question.description}</p>
        {`${question.User?.firstName} ${question.User?.lastName}`.length > 0 && <p className="author">Asked by: {(`${question.User?.firstName} ${question.User?.lastName}`.length) > 1 ? `${question.User?.firstName} ${question.User?.lastName}` : question.User?.email}</p>}
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
          editing === null ? <button className="answerBtn" onClick={() => onSubmitForm(false)}>Answer</button> : 
          <>
            <button className="editbtn" onClick={() => onSubmitForm(true)}>Save Changes</button>
            <button className="editbtn" onClick={cancelEditing}>Cancel</button>
          </>
        }
        <br /><br />
      </div>
      )}
      <Answers answers={question?.Answers} setEdit={setEdit} deleteAnswer={deleteAnswer}/>
    </>
  )
}

export default Question