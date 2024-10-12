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
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";

import { usernameValidator } from "../utils/validators";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "applicatioon/json",
      },
    };
try{


   const {data}= await axios.post(
      `${server}/api/user/login`,
      {
        username: username.value,
        password: password.value,
      },
      config
    );
    dispatch(userExists(true))
}catch(e)
{
    console.log(e)
}
  };
  const handleSignup = (e) => {
    e.preventDefault();
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
            Experience chat like never before with Rechat’s smart, user-focused
            features designed just for you
          </Typography>
          <Typography variant="body2" mt={2} color="yellow">
            {isLogin
              ? "Hit the login to get started"
              : "Register mow to get started"}
          </Typography>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center ">
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
            {isLogin ? (
              <>
                <Typography variant="h5">Login</Typography>
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
                      backgroundPosition: "left",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundPosition: "right",
                      },
                    }}
                  >
                    Login
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
                  >
                    Register
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h5">Register</Typography>
                <form
                  style={{ width: "100%", marginTop: "1rem" }}
                  onSubmit={handleSignup}
                >
                  <Stack position={"relative"} width={"10rem"} margin={"auto"}>
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
                  {username.error && (
                    <Typography color="error" variant="caption">
                      {username.error}
                    </Typography>
                  )}
                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
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
                  >
                    Login
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Login;
