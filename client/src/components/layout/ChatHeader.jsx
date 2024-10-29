import React, { useEffect, useState, Suspense } from 'react';
import { AppBar, Skeleton, Toolbar, Box, Typography, Avatar, IconButton, Backdrop, Stack } from '@mui/material';
import { useChatHeaderQuery } from '../../redux/reducers/api/api';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSelector, useDispatch } from 'react-redux';
import { setIsManageGroup } from '../../redux/reducers/misc';
import InfoIcon from '@mui/icons-material/Info';
import ManageGroup from '../../pages/ManageGroup';
import {Tooltip }from '@mui/material';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation } from '../../redux/reducers/api/api';
import { useLeaveGroupMutation } from '../../redux/reducers/api/api';
import { useNavigate } from 'react-router-dom';
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
const ChatHeader = ({ chatId }) => {
  const { isManageGroup } = useSelector((state) => state.misc);
  const currentUser = useSelector((state) => state.auth.user._id);
  const { data, isLoading } = useChatHeaderQuery({ chatId });
  const [chatName, setChatName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
   const [isGroupAdmin, setIsGroupAdmin] = useState(false);
   const[isGroup,setisGroup]=useState(false);
   const navigate=useNavigate();
  useEffect(() => {
    if (data) {
      setChatName(data.chatName);
      setAvatar(data.members[0].avatar.url);
       setIsGroupAdmin(currentUser?.toString() === data?.creator?.toString())
       if(data.members.length>1){
         setisGroup(true)
       }
    }
  }, [chatId, data]);
  

  const handleManageGroup = () => {
    dispatch(setIsManageGroup(true));
  };
 

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const leaveGroupHandler = () => {
    
    leaveGroup("Leaving Group...", chatId);
  };

  const deleteChatHandler = () => {
   
    deleteChat("Deleting Chat...", chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

   
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <AppBar position="static" color="default" sx={{ boxShadow: 'none', padding: '0 16px' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={avatar} alt="User" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{chatName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {isGroup &&
                    (data.members.slice(0, 3).map((member) => member.name).join(', ') +
                      (data.members.length > 3 ? ', ...' : ''))}
                </Typography>
              </Box>
            </Box>
            <Box>
             
             

             <Stack direction="row" spacing={2}>
               <IconButton 
  color="primary" 
  onClick={handleManageGroup}
>
  {isGroup && (
    isGroupAdmin ? <GroupsIcon /> : <InfoIcon />
  )}
</IconButton>

<IconButton color="primary">
  {isGroup ? (
    <Tooltip title="Leave Group">
      <ExitToAppIcon onClick={leaveGroupHandler}/>
    </Tooltip>
  ) : (
    <Tooltip title="Delete chat">
      <DeleteIcon onClick={deleteChatHandler} />
    </Tooltip>
  )}
</IconButton>
</Stack>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {isManageGroup && (
        <Suspense fallback={<Backdrop open />}>
          <ManageGroup chatId={chatId}   isGroupAdmin={isGroupAdmin} />
        </Suspense>
      )}
    </>
  );
};

export default ChatHeader;
