import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from "react-hot-toast"
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
 
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { useDispatch, useSelector } from "react-redux"
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
import {userNotExist , userExists } from "./redux/reducers/auth"

import { server } from './constants/config';
import { SocketProvider } from './socket';

 
const App = () => {
  const dispatch = useDispatch()
  const { user, loader } = useSelector((state) => state.auth)
  
  const {isAdmin}=useSelector((state)=>state.auth)



  useEffect(() => {
     
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/user/me`, { withCredentials: true });
         
        return response.data
        
      } catch (error) {
       
        
        return null;
         
      }
    };
  
    const getUserData = async () => {
      const result = await fetchUser(); 
       
      if (result) {
          dispatch(userExists(result.user));
      } else {
        dispatch(userNotExist());
        
      }
       
    };
  
    getUserData(); // Call the async function inside useEffect
  }, [dispatch]);
  
  return  loader ?(<LayoutLoader/>) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            
            <SocketProvider>
            <ProtectRoute user={user} />
            </SocketProvider>
            }>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            
          </Route>
          <Route path="/login"
            element={
              <ProtectRoute user={!user} redirect='/'>
                <Login />
              </ProtectRoute>
            } />
            

          <Route path="/admin" element={<AdminLogin />} />
          
        
          
          <Route path="/admin/dashboard" element={   <ProtectRoute user={isAdmin} redirect='/admin'>
          <DashBoard />
        </ProtectRoute>

          
          } />
         
        <Route path="/admin/users-management" element={
           <ProtectRoute user={isAdmin} redirect='/admin'>
            <UserManagement />
           </ProtectRoute>
          } />
          <Route path="*" element={<h1>Notfound</h1>} />
        </Routes>
      </Suspense>

      <Toaster position='top-center'/>
    </BrowserRouter>
  )
}

export default App
