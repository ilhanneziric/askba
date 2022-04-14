import '../styles/addQuestion.scss';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify"
import { useState } from 'react';
import '../styles/inputs.scss'
import { questionValidation } from "../validations";
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion} from '../redux/actions/questionsActions';

const AddQuestion = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    likes: 0,
    dislikes: 0,
    userId: userId
  });

  const { title, description} = inputs;

  const onChange = e => {
    setInputs({...inputs, [e.target.name] : e.target.value, userId : userId});
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const { error } = questionValidation({title: title, description: description});
        if(error){
            // setError(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1));
            toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
        }else{
            const parseRes = dispatch(addQuestion(inputs));
            if(parseRes){
                toast.success('Question added successfully');
                setShow(false);
                inputs.title = '';
                inputs.description = '';
            }
        }
    } catch (err) {
        // toast.error(err.response.data);
        console.log(err);
    }
} 

  return (
    <>
        <button className='addBtn' onClick={handleShow}>Add New Question</button>

        <Modal show={show} onHide={handleClose} centered={true} dialogClassName="modal-lg">
        <Modal.Header>
            <Modal.Title>Add new question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <form onSubmit={onSubmitForm}> */}
          {/* <p className="errMsg">{error}</p> */}
          
          <label htmlFor="title" className="logRegLbl">Title:</label>
          <input type="text" name="title" required className="logRegInput" value={title} onChange={e => onChange(e)} style={{ width: '100%'}}/>

          <label htmlFor="description" className="logRegLbl">Description:</label>
          <textarea type="text" name="description" required className="logRegInput" value={description} onChange={e => onChange(e)} style={{ width: '100%', height: '6em'}}/>

        {/* </form> */}
        </Modal.Body>
        <Modal.Footer>
          <button className="logRegSubmit" onClick={onSubmitForm}>Ask</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddQuestion