import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem';
import { Paper } from '@mui/material';
const ChatList = (

    {
        w="100%",
        chats=[],
        chatId,
        onlineUsers=[],
        newMessagesAlert=[
            {
                chatId :"",  
                count:0
            }
        ],
        handleDeleteChat
    }
) => {
  return (
    <Paper wdth={w}
    
     elevation={9}
    direction={"column"}
    sx={{
      overflow:"auto",
      height:"100%", 
       
    }}
    >
      
     
      
      { 
       
  chats?.map((data, index) => {

    const {avatar,_id,name,groupChat,members}=data
     
    const newMessageAlert =newMessagesAlert.find(({chatId})=>chatId ===_id)  
    const isOnline = members?.some((member) => onlineUsers.includes(_id))

    return <ChatItem 
    index={index}
    newMessageAlert={newMessageAlert} 
    isOnline={isOnline}
    avatar ={avatar}
    name ={name}
    _id={_id}
    key={_id}
    groupChat={groupChat}
    sameSender={_id == chatId}
    handleDeleteChat={handleDeleteChat}
    
    />
    ;
  })
}
     
    </Paper>
  )
}

export default ChatList

