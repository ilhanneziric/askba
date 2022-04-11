import '../styles/profileBtn.scss';
import { AiOutlineUser } from "react-icons/ai";

const ProfileBtn = () => {
  return (
    <>
        <div className='profileIconContainer'>
            <AiOutlineUser className='profileIcon'/>
        </div>
    </>
  )
}

export default ProfileBtn