import { useDispatch, useSelector } from "react-redux";
import { updIsAuthenticated } from '../redux/actions/isAuthenticatedActions';
import Header from "../components/Header";
import { useEffect, useState } from "react";
import '../styles/profile.scss'
import Questions from "../components/Questions";
import AccountDetails from "../components/AccountDetails";
import Notifications from "../components/Notifications";
import { getUser } from "../redux/actions/userActions";
// import { getQuestionsByUserId } from "../redux/actions/questionsActions";

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
    // userId !== null && dispatch(getQuestionsByUserId());
  },[userId])

  return (
    <>
      { user !== null && <><Header/>
      <div className="profileContainer">
        <div className="profileName">{(`${user.firstName} ${user.lastName}`.length) > 1 ? `${user.firstName} ${user.lastName}` : user.email}</div>
        <button onClick={(e) => logout(e)} className='logoutBtn'>Log Out</button><hr />
        <div className="profileNav">
            {currentPage === 'account' ? <div className="profileNavBtn activeBtn">Account Details</div> : <div className="profileNavBtn" onClick={() => setCurrentPage('account')}>Account Details</div>}
            {currentPage === 'questions' ? <div className="profileNavBtn activeBtn">My Questions</div> : <div className="profileNavBtn" onClick={() => setCurrentPage('questions')}>My Questions</div>}
            {currentPage === 'notifications' ? <div className="profileNavBtn activeBtn">Notifications</div> : <div className="profileNavBtn" onClick={() => setCurrentPage('notifications')}>Notifications</div>}
        </div>
        <div className="profileNavContentContainer">
          {currentPage === 'account' ? <AccountDetails user={user}/> : currentPage === 'questions' ? <Questions isMyQuestions={true}/> : <Notifications/>}
        </div>
      </div></> }
    </>
  )
}

export default Profile