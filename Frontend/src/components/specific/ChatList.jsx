 import React, { useState } from 'react';
import { Stack, Paper, TextField, Typography,Button } from '@mui/material';
import ChatItem from '../shared/ChatItem';
import { blue } from '@mui/material/colors';
import { Search as SearchIcon} from '@mui/icons-material';
import {InputAdornment} from '@mui/material';
import {grey} from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import Search from './Search';
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
   const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter chats based on the search term
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleConnectClick = () => {
    dispatch(setIsSearch(true));
  }
const {isSearch}=useSelector((state)=>state.misc)
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
              borderColor: 'black', // white border on focus
            },
            '& input': {
              fontSize: '1rem', // larger font size for readability
              padding: '0.5rem', // increased padding for better spacing
            },
          }}

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
           {
            chats.length === 0 && (

       
              <Stack alignItems="center" sx={{ padding: "2rem" }}>
              <Typography variant="body1" align="center" sx={{ color: grey[600], marginBottom: "1rem" }}>
                Connect with a friend to start chatting
              </Typography>
              <Button
                variant="contained"
                onClick={handleConnectClick}
                sx={{
                  backgroundColor: blue[500],
                  color: "white",
                  borderRadius: "20px",
                  padding: "0.5rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  '&:hover': {
                    backgroundColor: blue[700],
                    boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Connect with Friends
              </Button>
              {
                isSearch && (

                  <Search/>
                )
                
              }
            </Stack>
         
            )
           }
      
      {
      
      filteredChats.map((data, index) => {
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
