import React, { Fragment } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { useRef } from 'react'
import { AttachFileOutlined, Send } from '@mui/icons-material'
import {InputBox} from '../components/styles/StyledComponents'
import { grayColor } from '../constants/color'
const Chat = () => {
  const containerRef=useRef(null)
  return (
    <Fragment> 
  <Stack 
     ref={containerRef}
     
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
     >

{/* Message */}
     </Stack>

     <form
         style={{
          height:"10%",
          
         }}
     >
      <Stack  
      direction={"row"}
      height={"100%"}
      padding={"1rem"}
      alignItems={"center"}
      position={"relative"}
      >

        <IconButton
        sx={{
          rotate: "30deg",
          position: "absolute",
            color: "white",
          left: "1.5rem",
        }}
        >
           <AttachFileOutlined/>
           
        </IconButton>
        <InputBox placeholder='Type Messages Here' />
        <IconButton
         type='submit'
        
         sx={{

          backgroundColor:"blue",
          marginLeft:"0.2rem",
          marginBottom:"0.2rem",
        "  &:hover":{
          

          
            backgroundColor:"darkblue"
          }

         }}>
          <Send/>
        </IconButton>
      </Stack>


     </form>
     </Fragment>
  )
}

export default AppLayout(Chat);
