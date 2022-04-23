import '../styles/addQuestion.scss';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify"
import '../styles/inputs.scss'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteQuestion } from '../redux/actions/questionActions';


const DeleteQuestion = ({show, handleClose}) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const parseRes = dispatch(deleteQuestion(params.id));
      
      if(parseRes){
        toast.success('Question deleted successfully');
        handleClose();
        navigate(-1);
    }
    } catch (err) {
        // toast.error(err.response.data);
        console.log(err);
    }
} 

  return (
    <>
        <Modal show={show} onHide={handleClose} centered={true} backdrop="static" dialogClassName="modal-sm">
            <Modal.Header>
                <Modal.Title>Delete this question?</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>
            
            Delete this question?

            </Modal.Body> */}
            <Modal.Footer>
            <button className="answerBtn" style={{marginRight: '10px'}} onClick={handleClose}>Cancel</button>
            <button className="answerBtn" onClick={onSubmitForm}>Delete</button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default DeleteQuestion