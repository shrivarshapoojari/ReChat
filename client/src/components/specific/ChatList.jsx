import React from 'react'
import { Stack } from '@mui/material'
const ChatList = (

    {
        w="100%",
        chats=[],
        chatId,
        onlineUsera=[],
        newMessageAlert=[
            {
                chatId :"",  
                count:0
            }
        ],
        handleDeleteChat
    }
) => {
  return (
    <Stack width={w} direction={"column"}>
      {
  chats?.map((data, index) => {
    return <div key={index}>{data}</div>;
  })
}
    </Stack>
  )
}

export default ChatList

