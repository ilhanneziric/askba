import { Modal } from "react-bootstrap"
import axios from 'axios';
import '../styles/profile.scss'
import { passwordValidation } from "../validations";
import { toast } from "react-toastify"
import { useState } from 'react';
import { useSelector } from "react-redux";

const PasswordModal = ({show, handleClose}) => {
    const user = useSelector(state => state.user);

    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const { currentPassword, newPassword} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});        
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const { error } = passwordValidation({newPassword: newPassword, currentPassword: currentPassword});
    
            if(error){
              toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
            }else{
              const response = await axios.put(`http://localhost:5000/api/auth/changepassword/${user.id}`, inputs, {
                headers: {token: localStorage.token}
            });
              const parseRes = await response.data;
              if(parseRes){
                toast.success(`Password changed successfully`);
                handleClose();
                setInputs({currentPassword: '', newPassword: ''})
              }
            }
        } catch (err) {
            toast.error(err.response.data);
        }
    }
    return (
        <Modal show={show} onHide={handleClose} centered={true} dialogClassName="modal-md">
            <Modal.Header>
                <Modal.Title>Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <label htmlFor="currentPassword" className="logRegLbl">Current password:</label>
                <input type="password" name="currentPassword" minLength={5} required className="logRegInput" style={{width: '24em'}} value={currentPassword} onChange={e => onChange(e)} />

                <label htmlFor="newPassword" className="logRegLbl">New password:</label>
                <input type="password" name="newPassword" minLength={5} required className="logRegInput" style={{width: '24em'}} value={newPassword} onChange={e => onChange(e)} />
                
            </Modal.Body>
            <Modal.Footer>
            {
                <button className="profileNavBtn" onClick={onSubmitForm}>Save</button>
            }
            </Modal.Footer>
        </Modal>
  )
}

export default PasswordModal