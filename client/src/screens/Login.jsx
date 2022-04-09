import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios';
import Logo from "../components/Logo";
import '../styles/inputs.scss'
import validation from "../validation";

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    // const [error, setError] = useState();

    const { email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});        
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const { error } = validation(inputs);

            if(error){
                // setError(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1));
                toast.error(error.details[0].message.replaceAll('"', '').charAt(0).toUpperCase() + error.details[0].message.replaceAll('"', '').slice(1))
            }else{
                const response = await axios.post('http://localhost:5000/api/auth/login', inputs);
                const parseRes = await response.data;
                if(parseRes){
                    localStorage.setItem('token', parseRes);
                    setAuth(true);
                    toast.success('Login Successfully')
                }
            }
        } catch (err) {
            setAuth(false);
            toast.error(err.response.data);
            console.log(err);
        }
    } 
    return (
        <>
            <Logo/>
            <h1 className="logTitle">Log in to your account</h1>
            <div className='logRegForm'>
                <form onSubmit={onSubmitForm}>
                    {/* <p className="errMsg">{error}</p> */}
                    <label htmlFor="email" className="logRegLbl">Email:</label>
                    <input type="email" name="email" required className="logRegInput" value={email} onChange={e => onChange(e)} />
                    <label htmlFor="password" className="logRegLbl">Password:</label>
                    <input type="password" name="password" minLength={5} required className="logRegInput" value={password} onChange={e => onChange(e)} />
                    <button className="logRegSubmit">Log In</button>
                </form>
            </div>
            <div className="logRegLink">New to Ask Ba? <Link to='/register'>Register</Link></div>
        </>
    )
}

export default Login