// // // import React from 'react'
// // // import { Stack } from '@mui/material'
// // // import ChatItem from '../shared/ChatItem';
// // // import { Paper } from '@mui/material';
// // // const ChatList = (

// // //     {
// // //         w="100%",
// // //         chats=[],
// // //         chatId,
// // //         onlineUsers=[],
// // //         newMessagesAlert=[
// // //             {
// // //                 chatId :"",  
// // //                 count:0
// // //             }
// // //         ],
       
// // //     }
// // // ) => {
// // //   return (
// // //     <Paper wdth={w}
    
// // //      elevation={10}
// // //     direction={"column"}
// // //     sx={{
// // //       overflow:"auto",
// // //       height:"100%", 
       
// // //     }}
// // //     >
      
     
      
// // //       { 
       
// // //   chats?.map((data, index) => {

// // //     const {avatar,_id,name,groupChat,members}=data
     
// // //     const newMessageAlert =newMessagesAlert.find(({chatId})=>chatId ===_id)  
// // //     const isOnline = members?.some((member) => onlineUsers.includes(_id))

// // //     return <ChatItem 
// // //     index={index}
// // //     newMessageAlert={newMessageAlert} 
// // //     isOnline={isOnline}
// // //     avatar ={avatar}
// // //     name ={name}
// // //     _id={_id}
// // //     key={_id}
// // //     groupChat={groupChat}
// // //     sameSender={_id == chatId}
     
    
// // //     />
// // //     ;
// // //   })
// // // }
     
// // //     </Paper>
// // //   )
// // // }

// // // export default ChatList



// // import React, { useState } from 'react';
// // import { Stack, Paper, TextField } from '@mui/material';
// // import ChatItem from '../shared/ChatItem';

// // const ChatList = ({
// //     w = "100%",
// //     chats = [],
// //     chatId,
// //     onlineUsers = [],
// //     newMessagesAlert = [
// //         {
// //             chatId: "",  
// //             count: 0
// //         }
// //     ],
// // }) => {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   // Filter chats based on the search term
// //   const filteredChats = chats.filter((chat) =>
// //     chat.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <Paper
// //       width={w}
// //       elevation={10}
// //       sx={{
// //         overflow: "auto",
// //         height: "100%", 
// //       }}
// //     >
// //       {/* Search bar */}
// //       <Stack direction="row" sx={{ padding: "0.5rem" }}>
// //         <TextField
// //           fullWidth
// //           placeholder="Search"
// //           variant="outlined"
// //           value={searchTerm}
// //           onChange={handleSearchChange}
// //           size="small"
// //         />
// //       </Stack>

// //       {/* Chat items */}
// //       {filteredChats.map((data, index) => {
// //         const { avatar, _id, name, groupChat, members } = data;
// //         const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
// //         const isOnline = members?.some((member) => onlineUsers.includes(_id));

// //         return (
// //           <ChatItem
// //             index={index}
// //             newMessageAlert={newMessageAlert}
// //             isOnline={isOnline}
// //             avatar={avatar}
// //             name={name}
// //             _id={_id}
// //             key={_id}
// //             groupChat={groupChat}
// //             sameSender={_id === chatId}
// //           />
// //         );
// //       })}
// //     </Paper>
// //   );
// // };

// // export default ChatList;


 




















import React, { useState } from 'react';
import { Stack, Paper, TextField, Typography } from '@mui/material';
import ChatItem from '../shared/ChatItem';
import { blue } from '@mui/material/colors';
import { Search } from '@mui/icons-material';
import {InputAdornment} from '@mui/material';
const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",  
            count: 0
        }
    ],
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter chats based on the search term
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper
      width={w}
      elevation={10}
      sx={{
        overflow: "auto",
        height: "100%", 
      }}
    >
      {/* Search bar */}
      <Stack 
        direction="row" 
        alignItems="center" 
        sx={{ padding: "1rem", gap: "3rem", backgroundColor: blue[500] }}
      >
        <Typography 
          variant="h5" 
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Chats
        </Typography>
        <TextField
          placeholder="Search Chats"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{
            width: "100%",
            maxWidth: "300px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // rounded corners
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent background
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // more noticeable shadow
              transition: '0.3s', // smooth transition on focus
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent', // remove default border
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.1)', // subtle border on hover
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // white border on focus
            },
            '& input': {
              fontSize: '1rem', // larger font size for readability
              padding: '0.5rem', // increased padding for better spacing
            },
          }}

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Chat items */}
      {filteredChats.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={_id === chatId}
          />
        );
      })}
    </Paper>
  );
};

export default ChatList;
