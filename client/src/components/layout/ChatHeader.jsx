import React, { useEffect } from 'react'
import { AppBar, Skeleton } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Box } from '@mui/material'
import {Typography} from '@mui/material'
import {Avatar} from '@mui/material'
import {IconButton} from '@mui/material'
import { useChatHeaderQuery } from '../../redux/reducers/api/api'
import { useState } from 'react'
 
const ChatHeader = ({chatId}) => {
 
  const {data,isLoading,isError,Error}= useChatHeaderQuery({chatId})
  const[chatName,setChatName]=useState('')
  const[avatar,setAvatar]=useState(null)
 
  useEffect(()=>{

    if(data){
    setChatName(data.chatName)
      setAvatar(data.members[0].avatar.url)
    }

  },[chatId,data])

   
  return isLoading ? <Skeleton/>:(
    
             <AppBar position="static" color="default" sx={{ boxShadow: 'none', padding: '0 16px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatar} alt='User' />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{chatName}</Typography>
            <Typography variant="body2" color="textSecondary">
  {data?.members?.length > 1 && 
    (data.members.slice(0, 3).map((member) => member.name).join(', ') + 
    (data.members.length > 3 ? ', ...' : ''))}
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


 
