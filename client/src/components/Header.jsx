import { Link } from "react-router-dom";
import AddEditQuestion from "./AddEditQuestion";
import Logo from "../components/Logo";
import LogRegBtn from "../components/LogRegBtn";
import ProfileBtn from "../components/ProfileBtn";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <>
      <Logo /> 
      {isAuthenticated && <AddEditQuestion show={show} handleClose={handleClose} handleShow={handleShow}/>}
      {isAuthenticated ? (<Link to='/profile/account'><ProfileBtn/></Link>) : (<LogRegBtn/>)}
    </>
  )
}

export default Header