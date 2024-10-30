import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constants/events';
import { sampleChats } from '../../constants/sampleData';
import { useErrors } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/features';
import { useMyChatsQuery } from '../../redux/reducers/api/api';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat';
import {  setIsMobile } from '../../redux/reducers/misc';
import { getSocket } from '../../socket';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';
import Header from './Header';
  
const AppLayout = (WrappedComponent) => {
  return (props) => {
   
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
     
      dispatch(incrementNotification())
    }, []);

      const refetchListner=useCallback(()=>{
             refetch()
            //  navigate("/")
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

 


    const handleMobileClose = () => {
      dispatch(setIsMobile(false))
    }

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
    }, [newMessagesAlert])

   const{notClicked}=useSelector((state)=>state.misc)


    return (
      <>
        <Title />
        <Header/>
        

        {
          isLoading ? <Skeleton />
            : (
              <Drawer open={isMobile && notClicked} onClose={handleMobileClose}>
                <ChatList
                  w='70vw'

                  chats={data?.chats}
                  chatId={chatId}
                 

                  newMessagesAlert={newMessagesAlert}
                />
              </Drawer>
            )
        }
    <Grid container height={"calc(100vh - 4rem)"} >

          <Grid
            item
            sm={4}
            md={4}
            lg={4}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={"100%"}
          >

            {
              isLoading ? <Skeleton /> : <ChatList
                chats={data?.chats || sampleChats}
                chatId={chatId}
              
                newMessagesAlert={newMessagesAlert}


              />
            }










          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={8} height={"100%"}>

            <WrappedComponent {...props} chatId={chatId} />

          </Grid>
                                     
      </Grid>

      </>
    );
  };
};

export default AppLayout;
