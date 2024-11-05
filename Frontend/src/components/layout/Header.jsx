import { Menu as MenuIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { AppBar, Avatar, Backdrop, Badge, Box, IconButton, Stack, Toolbar, Tooltip, Typography,Popover } from '@mui/material'
import axios from 'axios'
import React, { Suspense } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { blue } from '../../constants/color'
import { server } from '../../constants/config'
import { userNotExist } from '../../redux/reducers/auth'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsProfile, setIsSearch, setnotClicked } from '../../redux/reducers/misc'
import ProfileCard from '../specific/ProfileCard'
import { useMediaQuery } from '@mui/material'
import { useState } from 'react'
const Search = React.lazy(() => import('../specific/Search'));
const NewGroup = React.lazy(() => import('../specific/NewGroup'));
const Notifications = React.lazy(() => import('../specific/Notifications'));

const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreOptionsClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery('(max-width:420px)');
  
  const {notificationCount}=useSelector((state)=>state.chat)
   
  const { isNotification } = useSelector((state) => state.misc)

  const { isSearch,isNewGroup ,isProfile} = useSelector((state) => state.misc)
  

  const navigate = useNavigate();
  const handleMobile = () => {

    dispatch(setIsMobile(true))
    dispatch(setnotClicked(true))


  }
  const openSearch = () => {
    
    dispatch(setIsSearch(true));
    handleMoreOptionsClose();
  }
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
    handleMoreOptionsClose();
  }
  const openNotification = () => {
    dispatch(setIsNotification(true))
    handleMoreOptionsClose();
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
    handleMoreOptionsClose();
    

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
      transition: 'color 0.3s',  
      '&:hover': {
        color: '#e3f2fd',  
      },
    }}
  >
    Rechat
  </Typography>
</Stack>

             
            <Box sx={{ flexGrow: 1 }} />
            <Box>
             
             
             {
              !isSmallScreen && (
              <Tooltip title="Find Friends">
                <IconButton color='inherit' size="large" onClick={openSearch}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              )
}                  {

                  !isSmallScreen &&
              <Tooltip title="New Group">
                <IconButton color='inherit' size="large" onClick={openNewGroup}>
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
}

               {

               !isSmallScreen &&
              <Tooltip title="Friend Requests">
                <IconButton color='inherit' size="large" onClick={openNotification}>
                  {notificationCount >0 ?<Badge badgeContent={notificationCount} color="error"><NotificationsIcon/></Badge>
                  : <NotificationsIcon/>
                  }
                  
                </IconButton>
              </Tooltip>
}
              <Tooltip title="Profile">
                <IconButton color='inherit' size="large" onClick={openProfileHandler}>
                   <Avatar  src={user?.avatar?.url}/> 
                </IconButton>
              </Tooltip>

             {
              
             isSmallScreen &&
              <IconButton color="inherit" onClick={handleMoreOptionsClick}>
                <MoreVertIcon />
              </IconButton>
}
              
              {
                isSmallScreen &&
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleMoreOptionsClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                  marginLeft:"0.5rem",
                  
                }}
              >
                <Box p={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1, 
                     elevation: 5,
                }}
                   
                >
                  <Tooltip title="Search">
                    <Stack direction="row" >
                    <IconButton color="inherit" onClick={openSearch}
                        
                      >
                      <SearchIcon />
                      <Typography  
                      sx={{
                        marginLeft:"0.8rem"
                      }}>  Search</Typography>
                    </IconButton>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="New Group">
                     <Stack direction="row" >
                    <IconButton color="inherit" onClick={openNewGroup}>
                      <GroupAddIcon />
                      <Typography  
                      sx={{
                        marginLeft:"0.8rem"
                      }}>  New Group</Typography>
                    </IconButton>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Friend Requests">
                    <Stack direction="row" >
                    <IconButton color="inherit" onClick={openNotification}>
                      <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon />
                        <Typography
                         sx={{
                          marginLeft:"0.8rem"
                        }}
                        >
                          Requests
                        </Typography>
                      </Badge>
                    </IconButton>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <Stack direction="row" >
                    <IconButton color="inherit" onClick={logoutHandler}>
                      <PowerSettingsNewIcon />
                      <Typography
                       sx={{
                        marginLeft:"0.8rem"
                      }}>Logout</Typography>
                    </IconButton>
                    </Stack>
                  </Tooltip>
                </Box>
              </Popover>
}
{
  !isSmallScreen &&

              <Tooltip title="Logout">
                <IconButton color='inherit' size="large" onClick={logoutHandler}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
}
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



 
 




























