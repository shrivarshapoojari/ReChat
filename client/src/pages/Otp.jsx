import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Fade,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { setIsOtp } from "../redux/reducers/misc";
const OtpComponent = ({data,email}) => {
  
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // Timer starts from 60 seconds
  const theme = useTheme();
const dispatch=useDispatch();

  // Handle OTP input change
  const handleChange = (value) => setOtp(value);

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown); // Cleanup on unmount
    }
  }, [timer]);

    const subject= "Verify your account with RECHAT";
    const message="Your OTP  for verifying your account with RECHAT is: ";


  const verifyOtp = async() => {

   const otpStatus= await toast.promise(
      axios.post(`${server}/api/v1/user/verifyOtp`, {email:email,otp:otp}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: 'Verifying...',
        success: 'Verified successfully👌',
        error: 'Failed to Verify, Please try again', // Default error message
      });
      console.log(otpStatus)
      if(otpStatus.data)
      {
        
    const userData=await toast.promise(
      axios.post(`${server}/api/v1/user/new`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      {
        loading: 'Onboarding in progress...',
        success: 'Registered Successfully 👌',
        error: 'Registration failed, please try again', // Default error message
      }
    );
     
    console.log(userData)
    
    dispatch(userExists(userData?.data?.user));
      }
  }
  const handleResendOtp = async() => {
    setOtp("");
    setTimer(60); // Reset the timer to 60 seconds
    await toast.promise(
      axios.post(`${server}/api/v1/user/sendOtp`, {email:email,subject:subject,message:message}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: 'Sending OTP...',
        success: 'OTP sent successfully 👌',
        error: 'Failed to send OTP, please try again', // Default error message
      });
  };

  return (
    <Fade in timeout={500}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        //   background: "linear-gradient(135deg, #00aaff, #0066ff)",
          padding: "1rem", // Prevents content from hitting screen edges
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 400,
            padding: 4,
            borderRadius: 8,
            textAlign: "center",
            boxShadow: `0 6px 20px ${theme.palette.divider}`,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              marginBottom: 2,
            }}
          >
            Enter OTP
          </Typography>

          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            length={4}
            TextFieldsProps={{
              sx: {
                width: { xs: 40, sm: 50 }, // Adjust for smaller screens
                height: { xs: 40, sm: 50 },
                margin: "0 0.4rem",
                "& input": {
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                },
              },
            }}
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{
                       marginTop: "2rem",
            }}
          >
            <Typography variant="body2" color="textSecondary" 
            >
              Resend OTP in:
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary"
             
            >
              {timer} sec
            </Typography>
          </Stack>

          <Button
            variant="outlined"
            onClick={handleResendOtp}
            disabled={timer > 0}
            sx={{
              mt: 2,
              textTransform: "none",
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Resend OTP
          </Button>
                         <Typography variant="body2" color="textSecondary"
                           sx={{
                            marginTop: "0.5rem",
                            cursor: "pointer",
                           }}
                           onClick={() => dispatch(setIsOtp(false))}
                         >
                           Change email?
                         </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={verifyOtp}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              boxShadow: `0px 4px 10px ${theme.palette.primary.light}`,
              backgroundImage: "linear-gradient(to right, #56CCF2, #2F80ED)",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: `0px 6px 14px ${theme.palette.primary.dark}`,
              },
            }}
          >
            Verify OTP
          </Button>
        </Paper>
      </Container>
    </Fade>
  );
};

export default OtpComponent;
