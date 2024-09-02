import React, { Fragment } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { useRef } from 'react'
import { AttachFileOutlined, Send } from '@mui/icons-material'
import {InputBox} from '../components/styles/StyledComponents'
import { grayColor } from '../constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import Message from '../components/shared/Message'
import { sampleMessage } from '../constants/sampleData'
const Chat = () => {
  const user={
    _id:"sdfsdfsdf",
    name:"Shri"
  }
  const containerRef=useRef(null)
  return (
    <Fragment> 
  <Stack 
     ref={containerRef}
     
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
           backgroundImage: "linear-gradient(to right, #FFFFFF, #D4DFED)"
        }}
     >

{/* Message */}


{
  sampleMessage.map((message)=>(
    <Message key={message._id} message={message} user={user}/>
  ))
}
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
     {/* <FileMenu/> */}
     </Fragment>
  )
}

export default AppLayout(Chat);
