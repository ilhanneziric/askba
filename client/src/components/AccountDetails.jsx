import '../styles/profile.scss'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PasswordModal from './PasswordModal';
import DetailsModal from './DetailsModal';

const AccountDetails = () => {
    const user = useSelector(state => state.user);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showp, setShowp] = useState(false);
    const handleClosep = () => setShowp(false);
    
    return (
        <div className="accountContainer">
            <div className="acclbl">First Name: <span className="accvalue">{user.firstName ? user.firstName : '-'}</span></div>
            <div className="acclbl">Last Name: <span className="accvalue">{user.lastName ? user.lastName : '-'}</span></div>
            <div className="acclbl">Email: <span className="accvalue">{user.email}</span></div>
            <div className="accountBtnContainer">
                <button onClick={(e) => setShow(true)} className='logoutBtn' style={{width:'30%'}}>Change account details</button>
                <DetailsModal show={show} handleClose={handleClose}/>
                <button onClick={(e) => setShowp(true)} className='logoutBtn'style={{width:'30%'}}>Change password</button>
                <PasswordModal show={showp} handleClose={handleClosep}/>
            </div>
        </div>
    )
}

export default AccountDetails