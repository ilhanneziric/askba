import { Link } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
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
      {isAuthenticated && <AddQuestion show={show} handleClose={handleClose} handleShow={handleShow}/>}
      {isAuthenticated ? (<Link to='/profile'><ProfileBtn/></Link>) : (<LogRegBtn/>)}
    </>
  )
}

export default Header