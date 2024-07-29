import React, { useState } from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import {useFileHandler, useInputValidation,useStrongPassword} from '6pp'

import {usernameValidator}  from '../utils/validators'
const Login = () => {


    const [isLogin, setIsLogin] = useState(true)
    const toggleLogin=()=>setIsLogin((prev)=>!prev)
    const name=useInputValidation("")
    const bio=useInputValidation("")
    const username=useInputValidation("",usernameValidator)
    const password=useInputValidation("")
    const avatar=useFileHandler("single")

    const handleLogin=(e)=>{
        e.preventDefault
    }
    const handleSignup=(e)=>{
     e.preventDefault
    }
    return (

    <Container component={"main"} 
    maxWidth="xs"
    sx={{height:"100vh",

        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }}>
        <Paper
            elevation={3}
            sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}








        >


            {isLogin ? (<>


                <Typography variant='h5'>Login</Typography>
                <form
                onSubmit={handleLogin}
                >
                    <TextField
                        required
                        fullWidth
                        label="username"
                        margin='normal'
                        variant='outlined'
                        value={username.value}
                        onChange={username.changeHandler}
                    />
                    <TextField
                        required
                        fullWidth
                        type='password'
                        label="Password"
                        margin='normal'
                        variant='outlined'
                        value={password.value}
                        onChange={password.changeHandler}
                    />


                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        fullWidth
                        sx={{
                            marginTop: "1rem"

                        }}
                    >
                        Login
                    </Button>
                    <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
                    <Button
                        variant='text'
                        sx={{
                            marginTop: "1rem"
                        }}
                        onClick={() => toggleLogin()}
                        fullWidth
                    >

                        Register
                    </Button>
                </form>
            </>)





                : 
                (<>


                    <Typography variant='h5'>Register</Typography>
                    <form
                      style={{
                        width:"100%",
                        marginTop:"1rem"
                      }}
                      onSubmit={handleSignup}
                      > 

                       
                        <Stack 
                        position={"relative"} 
                        width={"10rem"} 
                        margin={"auto"}
                        >

                                 <Avatar
                                 sx={{
                                    width:"10rem",
                                    height:"10rem",
                                    objectFit:"contain"
                                 }}
                                 src={avatar.preview}/>


                                 <IconButton
                                 sx={{
                                    position:"absolute",
                                    bottom:"0",
                                    right:"0",
                                    color:"white",
                                    bgcolor:"rgba(0,0,0,0.5)",
                                    ":hover":{
                                        bgcolor:"rgba(0,0,0,0.7)"
                                    }
                                 }}
                                 component="label"
                                 >
                                    <>
                                    <CameraAltIcon/>
                                    <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                                    </>
                                 </IconButton>
                        </Stack>
                        {avatar.error && (
                  <Typography 
                  m={"1rem auto"}
                  width={"fit-content"}
                  display={block}
                  color="error"
                   variant="caption">
                    {avatar.error}
                  </Typography>)}
                        <TextField
                            required
                            fullWidth
                            label="Name"
                            margin='normal'
                            variant='outlined'
                            value={name.value}
                            onChange={name.changeHandler}
                        />
                        <TextField
                            required
                            fullWidth
                            label="UserName"
                            margin='normal'
                            variant='outlined'
                            value={username.value}
                            onChange={username.changeHandler}
                        />
                       {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                           <TextField
                            required
                            fullWidth
                            label="Bio"
                            margin='normal'
                            variant='outlined'
                            value={bio.value}
                            onChange={bio.changeHandler}
                        />
                        <TextField
                            required
                            fullWidth
                            type='password'
                            label="Password"
                            margin='normal'
                            variant='outlined'
                            value={password.value}
                            onChange={password.changeHandler}

                        />
                                
    
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            fullWidth
                            sx={{
                                marginTop: "1rem"
    
                            }}
                        >
                          Register
                        </Button>
                        <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
                        <Button
                            variant='text'
                            sx={{
                                marginTop: "1rem"
                            }}
                            onClick={() => toggleLogin()}
                            fullWidth
                        >
    
                            Login
                        </Button>
                    </form>
                </>)}

        </Paper>
     
    </Container>)
}

export default Login
