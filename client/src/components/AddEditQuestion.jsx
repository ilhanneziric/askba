import '../styles/addQuestion.scss';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify"
import { useState } from 'react';
import '../styles/inputs.scss'
import { questionValidation } from "../validations";
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion} from '../redux/actions/questionsActions';
import { editQuestion } from '../redux/actions/questionActions';

const AddEditQuestion = ({isEdit = false, show, handleClose, handleShow}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const question = useSelector(state => state.question);
  const [inputs, setInputs] = useState({
    title: isEdit? question.title : '',
    description: isEdit? question.description : '',
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
            toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
        }else{
            var parseRes = null;
            isEdit ? parseRes = dispatch(editQuestion(inputs)) : parseRes = dispatch(addQuestion(inputs));
            if(parseRes){
                isEdit ? parseRes = toast.success('Question edited successfully') : toast.success('Question added successfully');
                handleClose();
                if(!isEdit){
                  inputs.title = '';
                  inputs.description = '';
                }
            }
        }
    } catch (err) {
        // toast.error(err.response.data);
        console.log(err);
    }
} 

  return (
    <>
        {!isEdit && <button className='addBtn' onClick={handleShow}>Add New Question</button>}

        <Modal show={show} onHide={handleClose} centered={true} dialogClassName="modal-lg">
        <Modal.Header>
            {isEdit ? <Modal.Title>Edit question</Modal.Title> : <Modal.Title>Add new question</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
        {/* <form onSubmit={onSubmitForm}> */}
          
          <label htmlFor="title" className="logRegLbl">Title:</label>
          <input type="text" name="title" required className="logRegInput" value={title} onChange={e => onChange(e)} style={{ width: '100%'}}/>

          <label htmlFor="description" className="logRegLbl">Description:</label>
          <textarea type="text" name="description" required className="logRegInput" value={description} onChange={e => onChange(e)} style={{ width: '100%', height: '6em'}}/>

        {/* </form> */}
        </Modal.Body>
        <Modal.Footer>
          {
            isEdit ? <button className="logRegSubmit" onClick={onSubmitForm}>Edit</button>:
            <button className="logRegSubmit" onClick={onSubmitForm}>Ask</button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEditQuestion