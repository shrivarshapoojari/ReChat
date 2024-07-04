import React, { useState } from 'react'
import { Button, Container, Paper, TextField, Typography } from "@mui/material"

const Login = () => {


    const [isLogin, setIsLogin] = useState(true)
    const toggleLogin=()=>setIsLogin((prev)=>!prev)
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
                <form>
                    <TextField
                        required
                        fullWidth
                        label="Username"
                        margin='normal'
                        variant='outlined'
                    />
                    <TextField
                        required
                        fullWidth
                        type='password'
                        label="Password"
                        margin='normal'
                        variant='outlined'
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
                    <form>
                        <TextField
                            required
                            fullWidth
                            label="Name"
                            margin='normal'
                            variant='outlined'
                        />
                           <TextField
                            required
                            fullWidth
                            label="Bio"
                            margin='normal'
                            variant='outlined'
                        />
                        <TextField
                            required
                            fullWidth
                            type='password'
                            label="Password"
                            margin='normal'
                            variant='outlined'
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
