import '../styles/profileBtn.scss';
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/actions/userActions';

const ProfileBtn = () => {
  const dispatch = useDispatch();
  const userid = useSelector(state => state.userId);
  return (
    <>
        <div className='profileIconContainer'>
            <AiOutlineUser className='profileIcon' onClick={() => dispatch(getUser(userid))}/>
        </div>
    </>
  )
}

export default ProfileBtn