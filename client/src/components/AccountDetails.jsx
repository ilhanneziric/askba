import axios from 'axios';
import { Modal } from 'react-bootstrap';
import '../styles/profile.scss'
import { emailValidation, passwordValidation } from "../validations";
import { toast } from "react-toastify"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, updUser } from '../redux/actions/userActions';

const AccountDetails = ({user}) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);



    const [showp, setShowp] = useState(false);
    const handleClosep = () => setShowp(false);
    
    const [inputs, setInputs] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });

    const {firstName, lastName, email} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});        
    }

    const [inputsp, setInputsp] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const { currentPassword, newPassword} = inputsp;

    const onChangep = e => {
        setInputsp({...inputsp, [e.target.name] : e.target.value});        
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const { error } = emailValidation({email: email});

            if(error){
                toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
            }else{
                const parseRes = dispatch(updUser(inputs));
                
                setShow(false);
                if(parseRes){
                    toast.success(`Changes saved successfully`);
                }
            }                
        } catch (err) {
            toast.error(err);
        }
    }

    const onSubmitFormp = async e => {
        e.preventDefault();
        try {
            const { error } = passwordValidation({newPassword: newPassword, currentPassword: currentPassword});
    
            if(error){
              toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
            }else{
              const response = await axios.put(`http://localhost:5000/api/auth/changepassword/${user.id}`, inputsp, {
                headers: {token: localStorage.token}
            });
              const parseRes = await response.data;
              if(parseRes){
                toast.success(`Password changed successfully`);
                setShowp(false);
              }
            }
        } catch (err) {
            toast.error(err.response.data);
        }
    }

    return (
        <div className="accountContainer">
            <div className="acclbl">First Name: <span className="accvalue">{user.firstName ? user.firstName : '-'}</span></div>
            <div className="acclbl">Last Name: <span className="accvalue">{user.lastName ? user.lastName : '-'}</span></div>
            <div className="acclbl">Email: <span className="accvalue">{user.email}</span></div>
            <div className="accountBtnContainer">
                <button onClick={(e) => setShow(true)} className='logoutBtn' style={{width:'30%'}}>Change account details</button>
                <button onClick={(e) => setShowp(true)} className='logoutBtn'style={{width:'30%'}}>Change password</button>
            </div>

            {/* ACCOUNT DETAILS */}
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

            {/* PASSWORD */}
            <Modal show={showp} onHide={handleClosep} centered={true} dialogClassName="modal-md">
                <Modal.Header>
                    <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label htmlFor="currentPassword" className="logRegLbl">Current password:</label>
                    <input type="password" name="currentPassword" minLength={5} required className="logRegInput" style={{width: '24em'}} value={currentPassword} onChange={e => onChangep(e)} />

                    <label htmlFor="newPassword" className="logRegLbl">New password:</label>
                    <input type="password" name="newPassword" minLength={5} required className="logRegInput" style={{width: '24em'}} value={newPassword} onChange={e => onChangep(e)} />
                    
                    {/* </form> */}
                </Modal.Body>
                <Modal.Footer>
                {
                    <button className="profileNavBtn" onClick={onSubmitFormp}>Save</button>
                }
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AccountDetails