 import React from 'react'
 import { Link } from '../styles/StyledComponents'
 import { Box, Stack, Typography } from '@mui/material'
 import {memo} from 'react'
import AvatarCard from './AvatarCard'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setnotClicked } from '../../redux/reducers/misc'

 const ChatItem = (
{

  avatar=[],
  name,
  _id,
 
  sameSender,
  isOnline,
  newMessageAlert,
  index=0,
  
}
 ) => {
     
  const dispatch = useDispatch();
  

   return (
     < Link to={`/chat/${_id}`} 
           onClick={()=>   dispatch(setnotClicked(false)) }  
     

     

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
          backgroundColor: sameSender ? "#E2DFD2" : "white",
          borderBottom: "0.1px solid black",
          cursor: "pointer",
          justifyContent: "flex-start",
         
         
          color: "black",
          gap: "1rem",
          position: "relative",
          


        }
      }>
        <AvatarCard avatar={avatar} />
         
        <Stack>
             <Typography variant="h6"
             sx={{
              marginLeft:"1rem"
             }}
             
             >{name}</Typography>
              
             { newMessageAlert &&
                 <Typography
                 sx={{
                   backgroundColor: '#4CAF50', // Green background
                   color: 'white', // White text
                   borderRadius: '1rem', // Fully rounded
                   padding: '0.2rem 0.6rem', // Padding for badge style
                   fontSize: '0.8rem', // Smaller font size for badge
                   marginTop: '0.3rem', // Space between name and badge
                   display: 'inline-block', // Inline-block to wrap content
                 }}
               >
                 {newMessageAlert.count} New Messages
               </Typography>
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
 