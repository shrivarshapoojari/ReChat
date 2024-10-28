import React, { useEffect, useState, Suspense } from 'react';
import { AppBar, Skeleton, Toolbar, Box, Typography, Avatar, IconButton, Backdrop } from '@mui/material';
import { useChatHeaderQuery } from '../../redux/reducers/api/api';
import GroupsIcon from '@mui/icons-material/Groups';
import { useSelector, useDispatch } from 'react-redux';
import { setIsManageGroup } from '../../redux/reducers/misc';
import ManageGroup from '../../pages/ManageGroup';

const ChatHeader = ({ chatId }) => {
  const { isManageGroup } = useSelector((state) => state.misc);
  const currentUser = useSelector((state) => state.auth.user._id);
  const { data, isLoading } = useChatHeaderQuery({ chatId });
  const [chatName, setChatName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setChatName(data.chatName);
      setAvatar(data.members[0].avatar.url);
    }
  }, [chatId, data]);

  const handleManageGroup = () => {
    dispatch(setIsManageGroup(true));
  };

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
                  {data?.members?.length > 1 &&
                    (data.members.slice(0, 3).map((member) => member.name).join(', ') +
                      (data.members.length > 3 ? ', ...' : ''))}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton color="primary"onClick={handleManageGroup}>
                {data?.members?.length > 1 &&
                  currentUser.toString() === data?.creator.toString() && (
                    <GroupsIcon  />
                  )}
              </IconButton>
              <IconButton color="primary" />
              <IconButton color="primary" />
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {isManageGroup && (
        <Suspense fallback={<Backdrop open />}>
          <ManageGroup chatId={chatId}  />
        </Suspense>
      )}
    </>
  );
};

export default ChatHeader;
