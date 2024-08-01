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
    <div className='bg-gradient-to-t from-[#0029ff]  to-[#00c6ff] min-h-[100vh] flex items-center justify-center' >
    <Container component={"main"} 
    maxWidth="xs"
    sx={{
    
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:"1rem",
      
    }}>
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


            {isLogin ? (<>


                <Typography variant='h5'>Login</Typography>
                <form
                onSubmit={handleLogin}
                >
                    <TextField
                        required
                        fullWidth
                        label="Username"
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
                    <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
                    <Button
                        variant='outlined'
                        sx={{
                            marginTop: "1rem",
                           
                             
                            '&:hover': {
                                background: 'linear-gradient(to right, #56CCF2, #2F80ED)', // Gradient background on hover
                                color: 'white',  
                                borderColor: 'transparent', 
                            }
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
                                mt: '1rem',
                                py: '0.5rem',
                                backgroundImage: 'linear-gradient(to right, #56CCF2, #2F80ED)',
                                color: 'white',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                                transition: 'background-position 0.3s ease-in-out',
                                backgroundSize: '200% 200%',
                                fontWeight: 'bold',
                                backgroundPosition: 'left',
                                '&:hover': {
                                  backgroundPosition: 'right',
                                },
                              }}
                        >
                          Register
                        </Button>
                        <Typography textAlign={"center"} m={"1rem"}>OR</Typography>
                        <Button
                            variant='outlined'
                            sx={{
                                marginTop: "1rem",
                               
                                 
                                '&:hover': {
                                    background: 'linear-gradient(to right, #56CCF2, #2F80ED)', // Gradient background on hover
                                    color: 'white',  
                                    borderColor: 'transparent', 
                                }
                            }}
                            onClick={() => toggleLogin()}
                            fullWidth
                        >
    
                            Login
                        </Button>
                    </form>
                </>)}

        </Paper>
     
    </Container>
    </div>)
}

export default Login