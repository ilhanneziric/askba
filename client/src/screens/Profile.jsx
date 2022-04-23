import { useDispatch, useSelector } from "react-redux";
import { updIsAuthenticated } from '../redux/actions/isAuthenticatedActions';
import Header from "../components/Header";
import { useEffect } from "react";
import '../styles/profile.scss'
import Questions from "../components/Questions";
import AccountDetails from "../components/AccountDetails";
import Notifications from "../components/Notifications";
import { getUser } from "../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
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
        <div className="profileName">{(`${user.firstName} ${user.lastName}`.length) > 1 ? `${user.firstName} ${user.lastName}` : user.email}</div>
        <button onClick={(e) => logout(e)} className='logoutBtn'>Log Out</button><hr />
        <div className="profileNav">
            {params.navigation === 'account' ? <div className="profileNavBtn activeBtn">Account Details</div> : <div className="profileNavBtn" onClick={() => navigate('/profile/account')}>Account Details</div>}
            {params.navigation === 'questions' ? <div className="profileNavBtn activeBtn">My Questions</div> : <div className="profileNavBtn" onClick={() => navigate('/profile/questions')}>My Questions</div>}
            {params.navigation === 'notifications' ? <div className="profileNavBtn activeBtn">Notifications</div> : <div className="profileNavBtn" onClick={() => navigate('/profile/notifications')}>Notifications</div>}
        </div>
        <div className="profileNavContentContainer">
          {params.navigation === 'account' ? <AccountDetails/> : params.navigation === 'questions' ? <Questions isMyQuestions={true}/> : <Notifications/>}
        </div>
      </div></> }
    </>
  )
}

export default Profile