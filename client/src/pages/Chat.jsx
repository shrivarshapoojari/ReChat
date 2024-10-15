import React, { Fragment, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { useRef } from 'react'
import { AttachFileOutlined, Send } from '@mui/icons-material'
import {InputBox} from '../components/styles/StyledComponents'
import { grayColor } from '../constants/color'
import FileMenu from '../components/dialogs/FileMenu'
import Message from '../components/shared/Message'
import { sampleMessage } from '../constants/sampleData'
import { getSocket } from '../socket'
import { NEW_MESSAGE } from '../constants/events'
import { useChatDetailsQuery } from '../redux/reducers/api/api'
const Chat = ({chatId}) => {
   const chatDetails=useChatDetailsQuery({chatId,skip:!chatId})

const members=chatDetails?.data?.chat?.members
console.log(chatDetails)
console.log(members)
 const socket=getSocket();
const [message,setMessage]=useState("")
const submitHandler=(e)=>{
  e.preventDefault();
  if(!message.trim())
    return;
  socket.emit(NEW_MESSAGE,{chatId,members,message})
  setMessage("")


}
  const user={
    _id:"sdfsdfsdf",
    name:"Shri"
  }
  const containerRef=useRef(null)
  return chatDetails.isLoading?<Skeleton/> : (
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
         onSubmit={submitHandler}
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
        <InputBox placeholder='Type Messages Here'   value={message} onChange={(e)=>setMessage(e.target.value)}/>
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
