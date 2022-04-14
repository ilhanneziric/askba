import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios';
import Logo from "../components/Logo";
import '../styles/inputs.scss'
import { userValidation } from "../validations";

import { useDispatch,  } from "react-redux";
import { updIsAuthenticated } from '../redux/actions/isAuthenticatedActions';

const Register = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // const [error, setError] = useState();

  const {firstName, lastName, email, password} = inputs;

  const onChange = e => {
    setInputs({...inputs, [e.target.name] : e.target.value});        
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const { error } = userValidation({email: email, password: password});

        if(error){
          // setError(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1));
          toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
        }else{
          const response = await axios.post('http://localhost:5000/api/auth/register', inputs);
          const parseRes = await response.data;
          if(parseRes){
              localStorage.setItem('token', parseRes);
              dispatch(updIsAuthenticated());
              toast.success(`Welcome ${firstName} ${lastName}`)
          }
        }
    } catch (err) {
        dispatch(updIsAuthenticated());
        toast.error(err.response.data);
    }
}
  return (
    <>
      <Logo/>

      <h1 className="regTitle">Create Account</h1>
      <div className="logRegForm">
        <form onSubmit={onSubmitForm}>
            {/* <p className="errMsg">{error}</p> */}
            <label htmlFor="firstName" className="logRegLbl">First Name:</label>
            <input type="text" name="firstName" placeholder="" className="logRegInput" value={firstName} onChange={e => onChange(e)}/>
            <label htmlFor="lastName" className="logRegLbl">Last Name:</label>
            <input type="text" name="lastName" placeholder="" className="logRegInput" value={lastName} onChange={e => onChange(e)}/>
            <label htmlFor="email" className="logRegLbl">Email*:</label>
            <input type="email" name="email" required className="logRegInput" value={email} onChange={e => onChange(e)}/>
            <label htmlFor="password" className="logRegLbl">Password*:</label>
            <input type="password" name="password" minLength={5} required className="logRegInput" value={password} onChange={e => onChange(e)}/>
            <button className="logRegSubmit">Sign Up</button>
        </form>
      </div>
      <div className="logRegLink">Already have an account? <Link to='/login'>Login</Link></div>
    </>
  )
}

export default Register