 
 
import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { adminLogin, getAdmin } from '../../redux/thunks/admin'
import { useEffect } from "react";
const AdminLogin = () => {

    const navigate=useNavigate()
    const[secretkey,setSecretkey]=useState("")
const {isAdmin}=useSelector((state)=>state.auth)
const dispatch=useDispatch()
  const handleLogin=(e)=>{
      e.preventDefault();
      dispatch(adminLogin(secretkey))
      setSecretkey("")
      
  }
 
  useEffect(()=>{
   dispatch(getAdmin())        
  },[dispatch])


  useEffect(()=>{
    if(isAdmin){
       return    navigate("/admin/dashboard")
    }
 },[isAdmin])
 
    const handleInput=(e)=>{
     const {value}=e.target
    setSecretkey(value)
   
    }
  
 
  return (
    <div className='min-h-[100vh] md:flex bg-gradient-to-t from-[#0029ff]  to-[#00c6ff]'>
    {/* Left Section */}
    <div className='hidden md:flex md:w-1/2 items-center justify-center  bg-gradient-to-t from-[#0029ff] to-[#00c6ff] text-white p-8'>
        
        <div className="text-center">
            {/* Logo Image for Medium Screens and Above */}
            <img
                src="/logo.svg"
                alt="Logo"
                className="mx-auto mb-8" // Centered and add margin bottom
                style={{ maxWidth: '150px' }} // Limit the size of the logo
            />
            <Typography variant='h4' fontWeight='bold'>ReChat : Conversations Reimagined !</Typography>
            <Typography variant='body1' mt={2}>
            Experience chat like never before with Rechat’s smart, user-focused features designed just for you
            </Typography>
            <Typography variant='body2' mt={2} color='yellow'>
                 "Hit the login to get started" : "Register mow to get started"
            </Typography>
        </div>
    </div>

    {/* Right Section */}
    <div className='w-full md:w-1/2 flex items-center justify-center '>
        <Container component={"main"} 
            maxWidth="xs"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 5,
                }}
            >
                
                    <>
                        <Typography variant='h5'> Admin Login</Typography>
                        <form onSubmit={handleLogin}>
                            
                            <TextField
                                required
                                fullWidth
                                type='password'
                                label="Password"
                                margin='normal'
                                variant='outlined'
                                value={secretkey}
                                onChange={handleInput}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                fullWidth
                                sx={{
                                    mt: '1rem',
                                    py: '0.5rem',
                                    backgroundImage: 'linear-gradient(to right, #56CCF2, #2F80ED)',
                                    color: 'white',
                                    borderRadius: '0.375rem',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                                    transition: 'background-position 0.3s ease-in-out',
                                    backgroundSize: '200% 200%',
                                    backgroundPosition: 'left',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundPosition: 'right',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </form>
                            </>
                            </Paper>
                            </Container>
                            </div>
                    <div/>
                    </div>)

  
}

export default AdminLogin
