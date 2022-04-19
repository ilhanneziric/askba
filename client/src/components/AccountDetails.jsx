import axios from 'axios';
import { Modal } from 'react-bootstrap';
import '../styles/profile.scss'
import { emailValidation } from "../validations";
import { toast } from "react-toastify"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/userActions';

const AccountDetails = ({user}) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [inputs, setInputs] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
    console.log('inputs:', inputs);
    console.log('user:', user);

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
                const response = await axios.put(`http://localhost:5000/api/user/${user.id}`, inputs, {
                    headers: {token: localStorage.token}
                });
                const parseRes = await response.data;
                dispatch(getUser(user.id));
                setShow(false);
                if(parseRes){
                    toast.success(`Changes saved successfully`);
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
                <button onClick={(e) => console.log('sta ima')} className='logoutBtn'style={{width:'30%'}}>Change password</button>
            </div>

            <Modal show={show} onHide={handleClose} centered={true} dialogClassName="modal-lg">
                <Modal.Header>
                    <Modal.Title>Change account details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <form onSubmit={onSubmitForm}> */}
                    
                    <label htmlFor="firstName" className="logRegLbl">First Name:</label>
                    <input type="text" name="firstName" placeholder="" className="logRegInput" value={firstName} onChange={e => onChange(e)}/>

                    <label htmlFor="lastName" className="logRegLbl">Last Name:</label>
                    <input type="text" name="lastName" placeholder="" className="logRegInput" value={lastName} onChange={e => onChange(e)}/>

                    <label htmlFor="email" className="logRegLbl">Email*:</label>
                    <input type="email" name="email" required className="logRegInput" value={email} onChange={e => onChange(e)}/>
                    
                    {/* </form> */}
                </Modal.Body>
                <Modal.Footer>
                {
                    <button className="profileNavBtn" onClick={onSubmitForm}>Save</button>
                }
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AccountDetails