import logo from './logo.svg';
import './App.css';
import Registration from './Components/Registration/Registration';
import TransportPermit from './Components/Dashboard/TransportPermit';
import RequireAuth from './Components/Others/RequireAuth';
import Signin from './Components/Login/Signin';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import Signup from './Components/Login/Signup';
import auth from './firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';


function App() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return (
    <>
      
      <Routes>
        <Route path='/dashboard' element={<RequireAuth><AdminDashboard /></RequireAuth> }>
        <Route path='add-farmers' element={<Registration />}></Route>
        <Route path='tp-permit' element={<TransportPermit />}></Route>
        </Route>
        <Route path='/login' element={<Signin />}></Route>
        <Route path='/' element={<Signup />}></Route>
     
      </Routes>
    </>
  );
}

export default App;
