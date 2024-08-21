import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';


let user = true

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
        <Route path="*" element={<h1>Notfound</h1>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
