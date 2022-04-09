import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './styles/app.scss'
//screens
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Question from './screens/Question';
import Register from './screens/Register';
import Page404 from './screens/Page404';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }; 

  const isAuth = async() => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/is-verify', {
        headers: {token: localStorage.token}
      });
      const parseRes = await response.data;
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false) 
    } catch (err) {
        // toast.error(err.response.data); //not authorize err message
        setAuth(false);
    }
  }
  
  useEffect(() => {
    isAuth();
  },[])

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home isAuthenticated={isAuthenticated} setAuth={setAuth}/>}/>
            <Route path='/login' element={isAuthenticated ? (<Navigate to='/'/>) : (<Login setAuth={setAuth}/>)}/>
            <Route path='/register' element={isAuthenticated ? (<Navigate to='/'/>) : (<Register setAuth={setAuth}/>)}/>
            <Route path='/profile' element={isAuthenticated ? (<Profile setAuth={setAuth}/>) : (<Navigate to='/login'/>)}/>
            <Route path='/question' element={<Question isAuthenticated={isAuthenticated}/>}/>
            <Route path='/*' element={<Page404/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
