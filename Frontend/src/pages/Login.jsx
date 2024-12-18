import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import axios from "axios";
import { usernameValidator } from "../utils/validators";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import OtpComponent from "./Otp";
import { setIsOtp } from "../redux/reducers/misc";
import ResetPassword from "./ResetPassword";
import { setIsForgot } from "../redux/reducers/misc";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const { isOtp } = useSelector((state) => state.misc)

  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const email = useInputValidation("");
  const avatar = useFileHandler("single");
   const {forgot}=useSelector(state=>state.misc);

  const [userData, setUserData] = useState(null)

  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false)

  const handleForgotPassword = () => {
     dispatch(setIsForgot(true))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if username and password are provided
    if (!username.value || !password.value) {
      toast.error("Please fill all the fields");
      return;
    }

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setisLoading(true)
      // Use toast.promise to display loading, success, and error states
      const { data } = await toast.promise(
        axios.post(
          `${server}/api/v1/user/login`,
          {
            username: username.value,
            password: password.value,
          },
          config
        ),
        {
          loading: "Logging in...",
          success: "Logged in successfully ",
          error: "Login failed, please check your credentials", // Default error message
        }
      );

      // Dispatch action after successful login
      dispatch(userExists(data?.user));
      setisLoading(false)
    } catch (error) {
      setisLoading(false)

      // Graceful error handling with more detailed error message
      if (error.response) {
        toast.error(error.response.data.message || "Request failed with error");
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };












  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if any required field is missing
    if (!name.value) {
      toast.error("Please fill in the name");
      return;
    }
    
    if (!username.value) {
      toast.error("Please fill in the username");
      return;
    }
    
    if (!password.value) {
      toast.error("Please fill in the password");
      return;
    }
    
    if (!avatar.file) {
      toast.error("Please upload an avatar");
      return;
    }
    


    // Prepare form data
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("avatar", avatar.file);
    setUserData(formData)
    dispatch(setIsOtp(true))


    try {
      const subject = "Verify your account with RECHAT";
      const message = "Your OTP  for verifying your account with RECHAT is: ";


      await toast.promise(
        axios.post(`${server}/api/v1/user/sendOtp`, { email: email.value, subject: subject, message: message }, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: 'Sending OTP...',
          success: 'OTP sent successfully ',
          error: 'Failed to send OTP, please try again', // Default error message
        });





    } catch (error) {
      console.error(error);
      setisLoading(false)

      if (error.response) {
        toast.error(error.response.data.message || 'Request failed with error');
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('An unexpected error occurred');
      }
    }


  };



  return (
    <div className="min-h-[100vh] md:flex bg-gradient-to-t from-[#0029ff]  to-[#00c6ff]">
      {/* Left Section */}

      <div className="hidden md:flex md:w-1/2 items-center justify-center  bg-gradient-to-t from-[#0029ff] to-[#00c6ff] text-white p-8">
        <div className="text-center">
          {/* Logo Image for Medium Screens and Above */}
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
            Experience chat like never before with Rechat’s user-focused
            features designed just for you
          </Typography>
          <Typography variant="body2" mt={2} color="yellow">
            {isLogin
              ? "Hit the login to get started"
              : " Sign Up get started"}
          </Typography>
        </div>
      </div>

      {/* Right Section */}

      {isOtp ? (<OtpComponent data={userData} email={email.value} />)
        :

        (

          <div className="w-full md:w-1/2 flex items-center justify-center ">



            {
              forgot ?<ResetPassword/>:(
         
            <Container
              component={"main"}
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
                {

                  isLogin ?
                    (


                      <>



                        <Stack direction="row" sx={{ gap: "0.5rem", alignItems: "center" }}>
                          <img
                            src="/logoSmall.svg"
                            alt="Logo"
                            className="mx-auto mb-8"
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                              marginTop: "2rem",
                            }}
                          />
                          <Typography variant="h5">Login to Rechat</Typography>
                        </Stack>

                        <form onSubmit={handleLogin}>
                          <TextField
                            required
                            fullWidth
                            label="Username"
                            margin="normal"
                            variant="outlined"
                            value={username.value}
                            onChange={username.changeHandler}
                          />
                          <TextField
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            value={password.value}
                            onChange={password.changeHandler}
                          />

                          {/* Login button and Forgot Password link */}
                          <Box sx={{ position: "relative" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              fullWidth
                              sx={{
                                mt: "2rem",
                                py: "0.5rem",
                                backgroundImage: "linear-gradient(to right, #56CCF2, #2F80ED)",
                                color: "white",
                                borderRadius: "0.375rem",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                                transition: "background-position 0.3s ease-in-out",
                                backgroundSize: "200% 200%",
                                backgroundPosition: "left",
                                fontWeight: "bold",
                                "&:hover": {
                                  backgroundPosition: "right",
                                },
                              }}
                              disabled={isLoading}
                            >
                              Login
                            </Button>
                            {/* Forgot Password Link */}
                            <Typography
                              variant="body2"
                              sx={{
                                position: "absolute",
                                top: "0.7rem",
                                right: "0.2rem",
                                transform: "translateY(-50%)",
                                color: "#2F80ED",
                                fontWeight: "500",
                                cursor: "pointer",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                              onClick={handleForgotPassword} // Replace with your forgot password handler
                            >
                              Forgot Password?
                            </Typography>
                          </Box>

                          <Typography textAlign="center" m="1rem">
                            OR
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{
                              marginTop: "0.2rem",
                              "&:hover": {
                                background: "linear-gradient(to right, #56CCF2, #2F80ED)",
                                color: "white",
                                borderColor: "transparent",
                              },
                            }}
                            onClick={() => toggleLogin()}
                            fullWidth
                            disabled={isLoading}
                          >
                            Register
                          </Button>
                        </form>

                      </>



                    ) : (
                      <>
                        <Stack direction={"row"}
                          sx={{
                            marginTop: "-2rem",
                            gap: "0.5rem",
                            alignItems: "center",


                          }}
                        >
                          <img
                            src="/logoSmall.svg"
                            alt="Logo"
                            className="mx-auto mb-8" // Centered and add margin bottom
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                              marginTop: "2rem",

                            }} // Limit the size of the logo
                          />
                          <Typography variant="h5">Register to Rechat</Typography>
                        </Stack>
                        <form
                          style={{ width: "100%", marginTop: "1rem" }}
                          onSubmit={handleSignup}
                        >
                          <Stack position={"relative"} width={"10rem"} margin={"auto"}

                          >
                            <Avatar
                              sx={{
                                width: "10rem",
                                height: "10rem",
                                objectFit: "contain",
                              }}
                              src={avatar.preview}
                            />
                            <IconButton
                              sx={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                color: "white",
                                bgcolor: "rgba(0,0,0,0.5)",
                                ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
                              }}
                              component="label"
                            >
                              <>
                                <CameraAltIcon />
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={avatar.changeHandler}
                                />
                              </>
                            </IconButton>
                          </Stack>
                          {avatar.error && (
                            <Typography
                              m={"1rem auto"}
                              width={"fit-content"}
                              color="error"
                              variant="caption"
                            >
                              {avatar.error}
                            </Typography>
                          )}
                          <TextField
                            required
                            fullWidth
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            value={name.value}
                            onChange={name.changeHandler}
                          />
                          <TextField
                            required
                            fullWidth
                            label="UserName"
                            margin="normal"
                            variant="outlined"
                            value={username.value}
                            onChange={username.changeHandler}
                          />
                          <TextField
                            required
                            fullWidth
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            value={email.value}
                            onChange={email.changeHandler}
                          />


                          <TextField
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            value={password.value}
                            onChange={password.changeHandler}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{
                              mt: "1rem",
                              py: "0.5rem",
                              backgroundImage:
                                "linear-gradient(to right, #56CCF2, #2F80ED)",
                              color: "white",
                              borderRadius: "0.375rem",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                              transition: "background-position 0.3s ease-in-out",
                              backgroundSize: "200% 200%",
                              fontWeight: "bold",
                              backgroundPosition: "left",
                              "&:hover": {
                                backgroundPosition: "right",
                              },
                            }}
                            disabled={isLoading}
                          >
                            Register
                          </Button>
                          <Typography textAlign={"center"} m={"1rem"}>
                            OR
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{
                              marginTop: "1rem",
                              "&:hover": {
                                background:
                                  "linear-gradient(to right, #56CCF2, #2F80ED)",
                                color: "white",
                                borderColor: "transparent",
                              },
                            }}
                            onClick={() => toggleLogin()}
                            fullWidth
                            disabled={isLoading}
                          >
                            Login
                          </Button>
                        </form>
                      </>
                    )}
              </Paper>
            </Container>
              ) }
          </div>)
      }
    </div>

  );
};

export default Login;
