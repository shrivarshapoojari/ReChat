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
import { setIsMobile, setIsNotification, setIsProfile, setIsSearch } from '../../redux/reducers/misc'
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

          <Stack direction={"row"}
                    sx={{
                      gap:"1rem",
                      alignItems: "center",
                    
                      
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
            

            }} // Limit the size of the logo
          />
                <Typography variant="h5"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
                > Rechat</Typography>
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
              <Tooltip title="Manage Groups">
                <IconButton color='inherit' size="large" onClick={navigateToGroup}>
                  <GroupsIcon />
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
