import React, { useCallback, useEffect } from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../../constants/sampleData'
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/reducers/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';
import { useErrors } from '../../hooks/hook';
import { getSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constants/events';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat';
import { getOrSaveFromStorage } from '../../lib/features';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';
import { useRef } from 'react';
import ResponsiveAppBar from './NewHeader';
const AppLayout = (WrappedComponent) => {
  return (props) => {
    const  deleteMenuAnchor=useRef(null);
    const navigate=useNavigate();
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery()
    const params = useParams();
    const chatId = params.chatId
    const dispatch = useDispatch();

    const socket = getSocket()
    const { newMessagesAlert } = useSelector((state) => state.chat)

    const newMessageAlertHandler = useCallback((data) => {
      if (data?.chatId === chatId)
        return
      dispatch(setNewMessagesAlert(data))
      console.log(data)

    }, [chatId]);
    const newRequestHandler = useCallback(() => {
      console.log("New request")
      dispatch(incrementNotification())
    }, []);

      const refetchListner=useCallback(()=>{
             refetch()
             navigate("/")
      },[refetch])


    useEffect(() => {
      socket.on(REFETCH_CHATS,
        refetchListner


      )
      return () => {
        socket.off(REFETCH_CHATS, refetchListner)
      }
    }, [socket, refetchListner])


    useEffect(() => {
      socket.on(NEW_MESSAGE_ALERT,
        newMessageAlertHandler


      )
      return () => {
        socket.off(NEW_MESSAGE_ALERT, newMessageAlertHandler)
      }
    }, [socket, newMessageAlertHandler])





    useEffect(() => {

      socket.on(NEW_REQUEST, newRequestHandler)

      return () => {
        socket.off(NEW_REQUEST, newRequestHandler)
      }

    }, [socket, newRequestHandler])


    const { isMobile } = useSelector((state) => state.misc)
    const { user } = useSelector((state) => state.auth)

  


    useErrors([{ isError, error }])


    const handleDeleteChat = (e,chatId, groupChat) => {
      e.preventDefault();
      dispatch(setIsDeleteMenu(true))
      
       
      dispatch(setSelectedDeleteChat({chatId,groupChat}))
      deleteMenuAnchor.current=e.currentTarget;
      console.log("Delete chat")
    }


    const handleMobileClose = () => {
      dispatch(setIsMobile(false))
    }

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
    }, [newMessagesAlert])




    return (
      <>
        <Title />
        <ResponsiveAppBar />
        <DeleteChatMenu  dispatch={dispatch}  deleteMenuAnchor={deleteMenuAnchor}/>

        {
          isLoading ? <Skeleton />
            : (
              <Drawer open={isMobile} onClose={handleMobileClose}>
                <ChatList
                  w='70vw'

                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}

                  newMessagesAlert={newMessagesAlert}
                />
              </Drawer>
            )
        }
        <Grid container height={"calc(100vh - 4rem)"} >

          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={"100%"}
          >

            {
              isLoading ? <Skeleton /> : <ChatList
                chats={data?.chats || sampleChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}


              />
            }










          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>

            <WrappedComponent {...props} chatId={chatId} />

          </Grid>
          <Grid item
            md={4} lg={3}
            height={"100%"}
            sx={{


              display: { xs: 'none', md: 'block' },
              padding: "2rem",
              bgcolor: "#000000"
            }}
          >

            <Profile user={user} />
          </Grid>

        </Grid>

      </>
    );
  };
};

export default AppLayout;
