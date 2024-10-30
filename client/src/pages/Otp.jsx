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
const OtpComponent = ({data}) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // Timer starts from 60 seconds
  const theme = useTheme();

  // Handle OTP input change
  const handleChange = (value) => setOtp(value);

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown); // Cleanup on unmount
    }
  }, [timer]);

  const verifyOtp = async() => {

    await toast.promise(
      axios.post(`${server}/api/v1/user/sendOtp`, {email:email.value}, {
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
  }
  const handleResendOtp = () => {
    setOtp("");
    setTimer(60); // Reset the timer to 60 seconds
    onResendOtp();
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

          <Button
            variant="contained"
            color="primary"
            onClick={() => onVerifyOtp(otp)}
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
