import React, { Suspense } from 'react'
import { AppBar, Backdrop, Box, Icon, IconButton, Menu, Toolbar, Tooltip } from '@mui/material'
import { Typography } from '@mui/material'
import { blue } from '../../constants/color'
import { Menu as MenuIcon, Search as SearchICon} from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
const Search = React.lazy(()=>import('../specific/Search'));
const NewGroup = React.lazy(()=>import('../specific/NewGroup'));
const Notifications = React.lazy(()=>import('../specific/Notifications'));
 
const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const[isSearch, setIsSearch] = useState(false);
  const[isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const navigate = useNavigate();
  const handleMobile = () => {
    console.log('mobile')
    setIsMobile((prev)=>!prev);
  }
  const openSearch = () => {
    console.log('search');
      setIsSearch((prev)=>!prev);
  }
  const openNewGroup = () => {
    console.log('new group');
    setIsNewGroup((prev)=>!prev);
  }
  const openNotification = () => {  
    console.log('notification') ;
    setIsNotification((prev)=>!prev);
  }
const navigateToGroup = () => {
  navigate('/groups')
}
const logoutHandler = () => {   
  console.log('logout') ;
  
}
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
            bgcolor: blue
          }}
        >
          <Toolbar>

            <Typography
              variant='h6'
              sx={
                {
                  display: { xs: 'none', sm: 'block' },
                }
              }
            >Rechat</Typography>
            <Box
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>


            </Box>

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
                  <NotificationsIcon />
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
        isSearch &&(
           <Suspense fallback={<Backdrop open/>}>
            <Search />
          </ Suspense>
        )
      }
      {
         isNewGroup&&(
           <Suspense fallback= {<Backdrop open/>}>
            <NewGroup />
          </ Suspense>
        )
      }
      {
        isNotification &&(
           <Suspense fallback= {<Backdrop open/>}>
            <Notifications />
          </ Suspense>
        )
      }
      

    </>
  )
}

export default Header
