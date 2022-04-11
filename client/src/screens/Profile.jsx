import { useDispatch, useSelector } from "react-redux";
import { updUserId } from "../redux/actions/userIdActions";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from "axios";

const Profile = ({setAuth}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);

  const [name, setName] = useState('ime prezime');

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    dispatch(updUserId(null));
  }

  const getNameById = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      const parseRes = await response.data;
      setName(`${parseRes.firstName} ${parseRes.lastName}`);
    } catch (err) {
        toast.error(err.response.data);
        console.log(err.message); 
    }
  }

  useEffect(() => {
    userId !== null && getNameById();
  },[])

  return (
    <>
      <Header isAuthenticated={false}/>
      <div>Profile {name}, id={userId}</div>
      <button onClick={(e) => logout(e)}>Log Out</button>
    </>
  )
}

export default Profile