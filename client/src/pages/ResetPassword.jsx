import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Fade,
  TextField,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { setIsOtp } from "../redux/reducers/misc";

const ResetPassword = () => {
  const [step, setStep] = useState("email"); // Step state to control different stages
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const theme = useTheme();
  const dispatch = useDispatch();
  const subject="Reset Password"
  const message="Your OTP for changing password is : "
  // Handle OTP input change
  const handleOtpChange = (value) => setOtp(value);

 
  useEffect(() => {
    if (timer > 0 && step === "otp") {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown); // Cleanup on unmount
    }
  }, [timer, step]);

  // Send OTP to email
  const handleSendOtp = async () => {
    setTimer(60);
    setOtp("");
    await toast.promise(
      axios.post(`${server}/api/v1/user/sendOtp`, { email:email,subject:subject,message:message }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending OTP...",
        success: "OTP sent successfully 👌",
        error: "Failed to send OTP, please try again",
      }
    );
    setStep("otp");
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpStatus = await toast.promise(
      axios.post(`${server}/api/v1/user/verifyOtp`, { email, otp }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Verifying...",
        success: "Verified successfully 👌",
        error: "Failed to Verify, Please try again",
      }
    );
    if (otpStatus.data) {
      setStep("resetPassword");
    }
  };

  // Change Password
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    await toast.promise(
      axios.post(`${server}/api/v1/user/changePassword`, { email:email, password:newPassword }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Changing password...",
        success: "Password changed successfully 👌",
        error: "Failed to change password, please try again",
      }
    );
    
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setOtp("");
    setTimer(60);
    await toast.promise(
      axios.post(`${server}/api/v1/user/sendOtp`, {email:email,subject:subject,message:message }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending OTP...",
        success: "OTP sent successfully 👌",
        error: "Failed to send OTP, please try again",
      }
    );
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
        //   minHeight: "100vh",
          padding: "1rem",
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
          {step === "email" && (
            <>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 2 }}>
                Enter Email
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                
                fullWidth
                onClick={handleSendOtp}
                sx={{ mt: 2 ,
                     backgroundImage:
                                "linear-gradient(to right, #56CCF2, #2F80ED)"



                }}
              >
                Send OTP
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 2 }}>
                Enter OTP
              </Typography>
              <MuiOtpInput
                value={otp}
                onChange={handleOtpChange}
                length={4}
                TextFieldsProps={{
                  sx: {
                    width: { xs: 40, sm: 50 },
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
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ marginTop: "2rem" }}>
                <Typography variant="body2" color="textSecondary">Resend OTP in:</Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">{timer} sec</Typography>
              </Stack>
              <Button variant="outlined" onClick={handleResendOtp} disabled={timer > 0} sx={{ mt: 2 }}>Resend OTP</Button>
              <Button variant="contained" color="primary" onClick={verifyOtp} fullWidth sx={{ mt: 2, py: 1.5, fontWeight: "bold" ,
               backgroundImage:
                                "linear-gradient(to right, #56CCF2, #2F80ED)"



              }}>
                Verify OTP
              </Button>
            </>
          )}

          {step === "resetPassword" && (
            <>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main, marginBottom: 2 }}>
                Reset Password
              </Typography>
              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleChangePassword} sx={{ mt: 2, py: 1.5, fontWeight: "bold" ,
                 backgroundImage:
                                "linear-gradient(to right, #56CCF2, #2F80ED)"
              }}>
                Change Password
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Fade>
  );
};

export default ResetPassword;
