import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/App.css';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import PublicRouter from './PublicRouter';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/SignUp';

function App() {
  return (
   <AuthProvider>
    <ToastContainer />
    <Layout>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<PublicRouter/>}>
          <Route path='/signup'  element={<Signup/>}/>
        </Route>
        <Route path='/login' element={<PublicRouter/>}>
          <Route path='/login'  element={<Login/>}/>
        </Route>

        <Route path='/quiz/:id' element={<PrivateRoute/>}>
          <Route path='/quiz/:id' element={<Quiz/>}/>
        </Route>  
        <Route path='/result/:id' element={<PrivateRoute/>}>
          <Route path='/result/:id' element={<Result/>}/>
        </Route>
      </Routes>

      
    </Layout>
    </AuthProvider>
  );
}

export default App;
