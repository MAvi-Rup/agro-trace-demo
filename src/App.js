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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CollapsibleSidepanel from './Components/Dashboard/AdminDashboard';
import AdminHome from './Components/Dashboard/AdminHome';
import AllUser from './Components/Dashboard/AllUser';


function App() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return (
    <>
      
      <Routes>
        <Route path='/dashboard' element={<RequireAuth><AdminDashboard /></RequireAuth> }>
        <Route index element={<AdminHome />}></Route>
        <Route path='add-farmers' element={<Registration />}></Route>
        <Route path='tp-permit' element={<TransportPermit />}></Route>
        <Route path='all-user' element={<AllUser />}></Route>
        </Route>
        <Route path='/login' element={<Signin />}></Route>
        <Route path='/' element={<Signup />}></Route>
     
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
