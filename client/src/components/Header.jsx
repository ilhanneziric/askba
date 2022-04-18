import { Link } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import Logo from "../components/Logo";
import LogRegBtn from "../components/LogRegBtn";
import ProfileBtn from "../components/ProfileBtn";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  
  return (
    <>
      <Logo /> 
      {isAuthenticated && <AddQuestion/>}
      {isAuthenticated ? (<Link to='/profile'><ProfileBtn/></Link>) : (<LogRegBtn/>)}
    </>
  )
}

export default Header