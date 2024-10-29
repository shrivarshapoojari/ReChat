import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography ,Box} from '@mui/material';
 

const Home = () => {
  return (
    <div className='flex w-full min-h-[93vh] '>
    <div className=" md:flex md:w-full items-center justify-center  bg-gradient-to-t from-[#0029ff] to-[#00c6ff] text-white p-8">
    <div className="text-center">
       
      <img
        src="/logo.svg"
        alt="Logo"
        className="mx-auto mb-8" // Centered and add margin bottom
        style={{ maxWidth: "150px" }} // Limit the size of the logo
      />
      <Typography variant="h4" fontWeight="bold">
        ReChat : Conversations Reimagined !
      </Typography>
      <Typography variant="body1" mt={2}>
        Experience chat like never before with Rechat’s smart, user-focused
        features designed just for you
      </Typography>
      
    </div>
  </div>
  </div>
  )
}

export default AppLayout(Home);
