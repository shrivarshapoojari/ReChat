import React, { useCallback, useEffect } from 'react';
import Header from './Header';
import Title from '../shared/Title';
import {Drawer, Grid, Skeleton} from '@mui/material';
import ChatList from '../specific/ChatList';
import {sampleChats} from  '../../constants/sampleData'
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/reducers/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';
import { useErrors } from '../../hooks/hook';
import { getSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../../constants/events';
import { incrementNotification } from '../../redux/reducers/chat';
const AppLayout = (WrappedComponent) => {
  return (props) => {
    const dispatch=useDispatch();

const socket=getSocket()


const newMessageAlertHandler=useCallback(()=>{},[]);
const newRequestHandler=useCallback(()=>{
  console.log("New request")
 dispatch(incrementNotification())
},[]);




useEffect(()=>{
  socket.on(NEW_MESSAGE_ALERT , 
    newMessageAlertHandler


  )
  return ()=>{
    socket.off(NEW_MESSAGE_ALERT,newMessageAlertHandler)
  }
},[socket,newMessageAlertHandler])





useEffect(()=>{

  socket.on(NEW_REQUEST,newRequestHandler)
  
  return ()=>{
    socket.off(NEW_REQUEST,newRequestHandler)
  }

},[socket,newRequestHandler])
 
   
    const {isMobile}=useSelector((state)=>state.misc)
     const {user}=useSelector((state)=>state.auth)
     
        const {isLoading,data,isError,error,refetch}=useMyChatsQuery()
          
               
             useErrors([{isError,error}])

    const params=useParams();
    const chatId=params.chatId
   
    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault();
      console.log("Delete chat")
    }


const handleMobileClose=()=>{
  dispatch(setIsMobile(false))
}



    return (
      <>
        <Title />
        <Header />

        {
          isLoading ?<Skeleton/>
          :(
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList
                w='70vw'
                   
                 chats={data?.chats}
                 chatId={chatId}
                 handleDeleteChat={handleDeleteChat}
                 
              
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
                    isLoading?<Skeleton/>:<ChatList 
                    chats ={data?.chats || sampleChats} 
                    chatId={chatId}
                    handleDeleteChat={handleDeleteChat}
                    
                
                   
                />
                  }



              
                  





            </Grid>
          <Grid item xs={12}  sm={8} md={5} lg={6} height={"100%"}>
          
               <WrappedComponent {...props} chatId={chatId}/>

          </Grid>
          <Grid item 
          md={4} lg={3} 
           height={"100%"} 
           sx={{

            
            display: { xs: 'none', md: 'block' },
            padding:"2rem",
            bgcolor:"#000000"
           }}
           >

            <Profile  user={user}/>
           </Grid>
             
         </Grid>
       
      </>
    );
  };
};

export default AppLayout;
