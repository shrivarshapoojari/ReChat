import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import {Toaster} from "react-hot-toast"
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { useDispatch, useSelector } from "react-redux"
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
import userNotExist from "./redux/reducers/auth"

import { server } from './constants/config';

 
const App = () => {
  const dispatch = useDispatch()
  const { user, loader } = useSelector(state => state.auth)
  console.log(user)
  useEffect(() => {
    console.log('server', server)
    const fetchUser = async () => {
      try {
        await axios.get(`${server}/api/v1/user/me`, { withCredentials: true })
      }
      catch (error) {
        dispatch(userNotExist())
      }
    }
    const res = fetchUser()
    console.log('res', res)
  }, [dispatch])
  return loader?(<LayoutLoader/>): (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route path="/login"
            element={
              <ProtectRoute user={!user} redirect='/'>
                <Login />
              </ProtectRoute>
            } />


          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/users-management" element={<UserManagement />} />

          <Route path="*" element={<h1>Notfound</h1>} />
        </Routes>
      </Suspense>

      <Toaster position='top-center'/>
    </BrowserRouter>
  )
}

export default App
