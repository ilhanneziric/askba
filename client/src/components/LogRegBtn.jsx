import { Link } from 'react-router-dom';
import '../styles/logRegBtn.scss';

const LogRegBtn = () => {
  return (
    <>
        <Link to='/register'><button className='logRegBtn'>Sign Up</button></Link>
        <Link to='/login'><button className='logRegBtn'>Log In</button></Link>
    </>
  )
}

export default LogRegBtn