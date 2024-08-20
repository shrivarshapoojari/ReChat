import React from 'react'
import { AppBar, Box, Icon, IconButton, Menu, Toolbar, Tooltip } from '@mui/material'
import { Typography } from '@mui/material'
import { orange } from '../../constants/color'
import { Menu as MenuIcon, Search as SearchICon} from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
const Header = () => {
  const navigate = useNavigate();
  const handleMobile = () => {
    console.log('mobile')
  }
  const openSearch = () => {
    console.log('search');
  }
  const openNewGroup = () => {
    console.log('new group');
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
            bgcolor: orange
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
            <Tooltip title="Logout">
            <IconButton color='inherit' size="large" onClick={logoutHandler}>
                 <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>

            </Box>
          </Toolbar>
        </AppBar>

      </Box>

    </>
  )
}

export default Header
