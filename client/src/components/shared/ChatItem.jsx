 import React from 'react'
 import { Link } from '../styles/StyledComponents'
 import { Box, Stack, Typography } from '@mui/material'
 import {memo} from 'react'
import AvatarCard from './AvatarCard'
import {motion} from 'framer-motion'
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
  handleDeleteChat,
}
 ) => {
    
  
   return (
     < Link to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
       sx={{
        padding: "0",
        
       }}
     
     >
       
      <motion.div 
         initial={{opacity:0,y:"-100%"}}
          whileInView={{opacity:1,y:0}}
            transition={{delay:index*0.1}}
      style={

        {
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "white",
          borderBottom: "1px solid white",
          cursor: "pointer",
          justifyContent: "space-between",
          color: sameSender ? "white" : "black",
          gap: "1rem",
          position: "relative",


        }
      }>
        <AvatarCard avatar={avatar} />
         
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
      { isOnline && (

      <Box sx={
        {
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "green",
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
        }
      }
      />
    )
  }


      </motion.div>
       </Link>
   )
 }
 
 export default memo(ChatItem);
 