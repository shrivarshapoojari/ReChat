import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
 
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
 


let user=false;``

const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>}>
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


        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<DashBoard/>} />
        <Route path="/admin/users-management" element={<UserManagement/>} />
         
        <Route path="*" element={<h1>Notfound</h1>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
