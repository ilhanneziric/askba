import { AiOutlineEdit, AiOutlineDelete, AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../redux/actions/answerActions";
import { deleteLike, like } from "../redux/actions/likeActions";

const Answers = ({answers, setEdit}) => {
    const dispatch = useDispatch();
    const userid = useSelector(state => state.userId);
    return (
        <>
        {
            answers !== undefined &&
            answers.map((a) => (

            <div className="aContainer" key={a.id}>
                <div className="aContainerLeft">
                <div className="atext">{a.text}</div>
                {`${a.User?.firstName} ${a.User?.lastName}`.length > 0 && <p className="author">Answered by: {(`${a.User?.firstName} ${a.User?.lastName}`.length) > 1 ? `${a.User?.firstName} ${a.User?.lastName}` : a.User?.email}</p>}
                </div>
                <div className="aContainerRight">

                {a.userId === userid && <div className="editDeleteIcons">
                    <div className="answerLikes" style={{visibility: 'hidden'}}>50</div>
                    <AiOutlineEdit className="answerIcon" onClick={() => setEdit(a)}/>
                    <AiOutlineDelete className="answerIcon" onClick={() => dispatch(deleteAnswer(a.id))}/>
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

export default Answers