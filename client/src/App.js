import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss'
import { useSelector, useDispatch} from 'react-redux';
import { updIsAuthenticated } from './redux/actions/isAuthenticatedActions';
import socket from './Socket';

//screens
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Question from './screens/Question';
import Register from './screens/Register';
import Page404 from './screens/Page404';


function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const userId = useSelector(state => state.userId);
    
  useEffect(() => {
    dispatch(updIsAuthenticated());
  }, []);

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            
            <Route path='/login' element={userId !== null ? (<Navigate to='/'/>) : (<Login/>)}/>
            
            <Route path='/register' element={userId !== null ? (<Navigate to='/'/>) : (<Register/>)}/>
            
            <Route path='/profile/:navigation' element={isAuthenticated ? (<Profile/>) : (<Navigate to='/login'/>)}/>

            <Route path='/question/:id' element={<Question/>}/>
            <Route path='/*' element={<Page404/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
