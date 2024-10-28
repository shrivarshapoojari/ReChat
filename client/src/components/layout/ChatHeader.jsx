import React from 'react'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Box } from '@mui/material'
import {Typography} from '@mui/material'
import {Avatar} from '@mui/material'
import {IconButton} from '@mui/material'

const ChatHeader = () => {
  return (
    
             <AppBar position="static" color="default" sx={{ boxShadow: 'none', padding: '0 16px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="User Name" src="/path/to/image.jpg" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">Varshitha</Typography>
            <Typography variant="body2" color="textSecondary">
              last seen yesterday at 23:40
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton color="primary">
            {/* <VideoCallIcon /> */}
            h1
          </IconButton>
          <IconButton color="primary">
            {/* <CallIcon /> */}
            2
          </IconButton>
          <IconButton color="primary">
            {/* <SearchIcon /> */}
            3
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    
  )
}

export default ChatHeader


 
