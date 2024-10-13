import React, { Suspense } from 'react'
import { AppBar, Backdrop, Box, Icon, IconButton, Menu, Toolbar, Tooltip } from '@mui/material'
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
import { setIsMobile, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
const Search = React.lazy(() => import('../specific/Search'));
const NewGroup = React.lazy(() => import('../specific/NewGroup'));
const Notifications = React.lazy(() => import('../specific/Notifications'));

const Header = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc)

  const { isSearch } = useSelector((state) => state.misc)
  const [isNewGroup, setIsNewGroup] = useState(false);

  const navigate = useNavigate();
  const handleMobile = () => {

    dispatch(setIsMobile(true))


  }
  const openSearch = () => dispatch(setIsSearch(true));
  const openNewGroup = () => {
    console.log('new group');
    setIsNewGroup((prev) => !prev);
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


    </>
  )
}

export default Header
