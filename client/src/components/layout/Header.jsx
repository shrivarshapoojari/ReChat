import React, { Suspense } from 'react'
import { AppBar, Backdrop, Badge, Box, Icon, IconButton, Menu, Toolbar, Tooltip } from '@mui/material'
import { Typography } from '@mui/material'
import { blue } from '../../constants/color'
import { Menu as MenuIcon, Search as SearchICon } from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { server } from '../../constants/config'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExist } from '../../redux/reducers/auth'
import axios from 'axios'
import { setIsMobile, setIsNotification, setIsProfile, setIsSearch, setnotClicked } from '../../redux/reducers/misc'
const Search = React.lazy(() => import('../specific/Search'));
const NewGroup = React.lazy(() => import('../specific/NewGroup'));
const Notifications = React.lazy(() => import('../specific/Notifications'));
import { setIsNewGroup } from '../../redux/reducers/misc'
 import {Avatar} from '@mui/material'
import ProfileCard from '../specific/ProfileCard'
import {Stack} from '@mui/material'
const Header = () => {
  const dispatch = useDispatch();

  const {notificationCount}=useSelector((state)=>state.chat)
   
  const { isNotification } = useSelector((state) => state.misc)

  const { isSearch,isNewGroup ,isProfile} = useSelector((state) => state.misc)
  

  const navigate = useNavigate();
  const handleMobile = () => {

    dispatch(setIsMobile(true))
    dispatch(setnotClicked(true))


  }
  const openSearch = () => dispatch(setIsSearch(true));
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  }
  const openNotification = () => {
    dispatch(setIsNotification(true))
  }
  const navigateToGroup = () => {
    navigate('/groups')
  }

  const logoutHandler = async () => {

    try {

      const { data } = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true })
      dispatch(userNotExist())
      toast.success(data.message)

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    }

    

  }

  

  const openProfileHandler=()=>{
       
    dispatch( setIsProfile(true))
  }
  const {user}=useSelector((state)=>state.auth)
  return (
    <>
      <Box
        sx={{
          flexGrow: 1
        }}
        height={"4rem"}
      >
        <AppBar position='static'
          sx={{
            bgcolor: blue,
        
          }}
        >
          <Toolbar>
           
          <Box
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>


            </Box>
            

          {/* <Stack direction={"row"}
           onClick={() => navigate('/')}
                    sx={{
                      gap:"1rem",
                      alignItems: "center",
                    cursor:"pointer"
                      
                    }}
                 >
                 <img
            src="/rechatheader.png"
            alt="Logo"
            className="mx-auto" // Centered and add margin bottom
            style={{height:"60px",
              width:"60px",
              borderRadius:"50%", 
             marginTop:"0.1rem",
            

            }} 
            
           
            // Limit the size of the logo
          />
                <Typography variant="h5"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
                > Rechat</Typography>
                </Stack>
             */}




<Stack
  direction="row"
  onClick={() => navigate('/')}
  sx={{
    gap: '1rem',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition
    '&:hover': {
      transform: 'scale(1.05)', // Slightly larger on hover
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Soft shadow on hover
    },
    '&:active': {
      transform: 'scale(0.95)', // Slightly shrink on click
    },
  }}
>
  <img
    src="/rechatheader.png"
    alt="Logo"
    style={{
      height: '60px',
      width: '60px',
      borderRadius: '50%',
      marginTop: '0.1rem',
      transition: 'transform 0.2s', // Smooth transition for the image
    }}
  />
  <Typography
    variant="h5"
    sx={{
      display: { xs: 'none', sm: 'block' },
      transition: 'color 0.3s', // Smooth transition for text
      '&:hover': {
        color: '#e3f2fd', // Color change on hover
      },
    }}
  >
    Rechat
  </Typography>
</Stack>

             
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Tooltip title="Search">
                <IconButton color='inherit' size="large" onClick={openSearch}>
                  <SearchICon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New Group">
                <IconButton color='inherit' size="large" onClick={openNewGroup}>
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
               
              <Tooltip title="Notifications">
                <IconButton color='inherit' size="large" onClick={openNotification}>
                  {notificationCount >0 ?<Badge badgeContent={notificationCount} color="error"><NotificationsIcon/></Badge>
                  : <NotificationsIcon/>
                  }
                  
                </IconButton>
              </Tooltip>

              <Tooltip title="Profile">
                <IconButton color='inherit' size="large" onClick={openProfileHandler}>
                   <Avatar  src={user?.avatar?.url}/> 
                </IconButton>
              </Tooltip>

              <Tooltip title="Logout">
                <IconButton color='inherit' size="large" onClick={logoutHandler}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>

            </Box>
          </Toolbar>
        </AppBar>

      </Box>
      {
        isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <Search />
          </ Suspense>
        )
      }
      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open />}>
            <NewGroup />
          </ Suspense>
        )
      }
      {
        isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <Notifications />
          </ Suspense>
        )
      }
      {
        isProfile && (
          <Suspense fallback={<Backdrop open />}>
             <ProfileCard/>
          </ Suspense>
        )
      }


    </>
  )
}

export default Header
