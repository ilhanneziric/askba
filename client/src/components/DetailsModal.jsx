import { useState } from "react";
import { Modal } from "react-bootstrap"
import '../styles/profile.scss'
import { updUser } from '../redux/actions/userActions';
import { emailValidation } from "../validations";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";

const DetailsModal = ({show, handleClose}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [inputs, setInputs] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });

    const {firstName, lastName, email} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});        
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const { error } = emailValidation({email: email});

            if(error){
                toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
            }else{
                const parseRes = dispatch(updUser(inputs));
                
                handleClose();
                if(parseRes){
                    toast.success(`Changes saved successfully`);
                }
            }                
        } catch (err) {
            toast.error(err);
        }
    }
    return (
        <Modal show={show} onHide={handleClose} centered={true} dialogClassName="modal-md">
            <Modal.Header>
                <Modal.Title>Change account details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <label htmlFor="firstName" className="logRegLbl">First Name:</label>
                <input type="text" name="firstName" placeholder="" className="logRegInput" style={{width: '24em'}} value={firstName} onChange={e => onChange(e)}/>

                <label htmlFor="lastName" className="logRegLbl">Last Name:</label>
                <input type="text" name="lastName" placeholder="" className="logRegInput" style={{width: '24em'}} value={lastName} onChange={e => onChange(e)}/>

                <label htmlFor="email" className="logRegLbl">Email*:</label>
                <input type="email" name="email" required className="logRegInput" style={{width: '24em'}} value={email} onChange={e => onChange(e)}/>
                
            </Modal.Body>
            <Modal.Footer>
            {
                <button className="profileNavBtn" onClick={onSubmitForm}>Save</button>
            }
            </Modal.Footer>
        </Modal>
  )
}

export default DetailsModal