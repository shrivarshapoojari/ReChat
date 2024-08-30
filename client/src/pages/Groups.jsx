import React, { memo } from 'react'
import { Box, Drawer, Grid, Icon, IconButton, Stack, Tooltip,Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import {Menu as MenuIcon} from '@mui/icons-material'
import { Link } from '../components/styles/StyledComponents';
export const bgGradient = "linear-gradient(rgb(255 225 209), rgb(249 159 159))";
import AvatarCard from '../components/shared/AvatarCard';
import { sampleChats } from '../constants/sampleData';
const Groups = () => {

const chatId=useSearchParams()[0].get("group")
  const navigate=useNavigate();
  const navigateBack=()=>{
    navigate("/")
  }
  const handleMobileClose=()=>{
    setIsMobileMenuOpen(false)
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobile=()=>{
    setIsMobileMenuOpen((prev)=>!prev)
  }
  const  IconBtns= <>
  
<Box    sx={{
    display:{
      xs:"block",
      sm:"none", 
      position:"fixed",
      right:"1rem",
      top:"1rem",
    }
  }}>
    <Tooltip title="Menu">
  <IconButton onClick={handleMobile}>

    <MenuIcon/>
  </IconButton>
  </Tooltip>
  </Box>
    <Tooltip title="back">
    <IconButton
    sx={{
      position:"absolute",
      top:"1rem",
      left:"1rem",
      bgcolor:"rgba(0,0,0,0.8)",
      color:"white",
      ":hover":{
        bgcolor:"rgba(0,0,0,0.6)"
      }
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
    </Tooltip>
  </>
  return (
    <Grid container height={"100vh"}>
        <Grid
           item
          
            sx={
              {
                display:{
                   xs:"none",
                   sm:"block"
                }
                
              }
            }
            bgcolor={"gray"}
            sm={4}

           >
           <GroupList myGroups={sampleChats} chatId={chatId}/>
          
           </Grid>
           
           <Grid item sm={8} xs={12}
            sx={{
              display:"flex",
              flexDirection:"column",
              position:"relative",
              padding:"1rem 3rem",
              alignItems:"center"
            }}
           > 
            {IconBtns}
            </Grid>
            <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
                   sx={{

              display:{
                xs:"block",
                sm:"none"
              }
                   }}
            >
              <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
               
            </Drawer>

    </Grid>
  )
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundColor: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});


export default Groups
