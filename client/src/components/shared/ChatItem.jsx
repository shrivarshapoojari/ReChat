 import React from 'react'
 import { Link } from '@mui/icons-material'
 import { Stack, Typography } from '@mui/material'
 const ChatItem = (
{

  avatar=[],
  name,
  _id,
  groupChat=false,
  sameSender,
  isOnline,
  newMessageAlert,
  index=0,
  handleDeleteChatOpen,
}
 ) => {
  

   return (
     <  Link to={`/chat/${_id}`}>
      <div style={

        {
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          borderBottom: "1px solid #f0f0f0",
          cursor: "pointer",
          justifyContent: "space-between",
          color: sameSender ? "white" : "black",
          gap: "1rem",
          position: "relative",


        }
      }>
        {/* Avatar */}
        <Stack>
             <Typography variant="h6">{name}</Typography>
             {
                newMessageAlert && (
                  <Typography>
                     {newMessageAlert.count} New Messages
                  </Typography>
                )
             }
        </Stack>



      </div>
       </Link>
   )
 }
 
 export default ChatItem
 