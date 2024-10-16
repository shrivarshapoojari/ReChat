import React, { Fragment, useCallback, useEffect, useState } from 'react'
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
import { useSelector } from 'react-redux'
const Chat = ({chatId}) => {

  const user=useSelector((state)=>state?.auth?.user)
   
   const chatDetails=useChatDetailsQuery({chatId,skip:!chatId})


   const [messages,setMessages]=useState([])
  //  console.log(messages)
const members=chatDetails?.data?.chat?.members
 
 const socket=getSocket();
const [message,setMessage]=useState("")
const submitHandler=(e)=>{
  e.preventDefault();
  if(!message.trim())
    return;
  socket.emit(NEW_MESSAGE,{chatId,members,message})
  setMessage("")


}

const newMessageHandler=useCallback ((data)=>{
   
  setMessages((prev)=>[...prev,data?.message])
})


useEffect(()=>{
  socket.on(NEW_MESSAGE, 
    newMessageHandler



  )
  return ()=>{
    socket.off(NEW_MESSAGE,newMessageHandler)
  }
},[socket])
  
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


{messages.map((message)=>(
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
