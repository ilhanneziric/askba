import { useDispatch, useSelector } from "react-redux";
import { updIsAuthenticated } from '../redux/actions/isAuthenticatedActions';
import Header from "../components/Header";
import { useEffect, useState } from "react";
import '../styles/profile.scss'
import MyQuestions from "../components/MyQuestions";
import AccountDetails from "../components/AccountDetails";
import Notifications from "../components/Notifications";
import { getUser } from "../redux/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const [currentPage, setCurrentPage] = useState('account');

  const user = useSelector(state => state.user);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(updIsAuthenticated());
  }

  useEffect(() => {
    userId !== null && dispatch(getUser(userId));
  },[userId])

  return (
    <>
      { user !== null && <><Header/>
      <div className="profileContainer">
        <div className="profileName">{(`${user.firstName} ${user.lastName}`)}</div>
        <button onClick={(e) => logout(e)} className='logoutBtn'>Log Out</button><hr />
        <div className="profileNav">
            {currentPage === 'account' ? <div className="profileNavBtn activeBtn">Account Details</div> : <div className="profileNavBtn" onClick={() => setCurrentPage('account')}>Account Details</div>}
            {currentPage === 'questions' ? <div className="profileNavBtn activeBtn">My Questions</div> : <div className="profileNavBtn" onClick={() => setCurrentPage('questions')}>My Questions</div>}
            {currentPage === 'notifications' ? <div className="profileNavBtn activeBtn">Notifications</div> : <div className="profileNavBtn" onClick={() => setCurrentPage('notifications')}>Notifications</div>}
        </div>
        
        {currentPage === 'account' ? <AccountDetails user={user}/> : currentPage === 'questions' ? <MyQuestions/> : <Notifications/>}
      </div></> }
    </>
  )
}

export default Profile