// import React from 'react'
// import { Dialog,DialogTitle,Typography,ListItem,Avatar ,IconButton, Button,Stack, Skeleton} from '@mui/material'
// import { sampleNotifications } from '../../constants/sampleData'
// import { memo } from 'react'
// import { useGetNotificationsQuery } from '../../redux/reducers/api/api'
// import { useErrors } from '../../hooks/hook'
// import { useDispatch, useSelector } from 'react-redux'
// import { setIsNotification } from '../../redux/reducers/misc'
// import toast from 'react-hot-toast'
// import { useAcceptFriendRequestMutation } from '../../redux/reducers/api/api'
// import { decrementNotification } from '../../redux/reducers/chat'
// const Notifications = () => {
//   const dispatch=useDispatch();
//   const { isNotification}=useSelector((state)=>state.misc)    
//   const{isLoading ,data,error,isError}=useGetNotificationsQuery()
  
//   useErrors([{error,isError}])
//     const[acceptFriendRequest]=useAcceptFriendRequestMutation();



//   const friendRequestHandler=async({_id,accept})=>{
 



//   try{
//    const res= await acceptFriendRequest({requestId:_id,accept})
 
//    if(res?.data?.success){ 
//       toast.success(res.data.message)
//       dispatch(decrementNotification())
//    }
//    else{
//       toast.error(res?.data?.message || "Something went wrong")
//    }
 
//   }catch(error){
//      toast.error(error)
//   }
     
//       closeNotification();
   
//   }
//   const closeNotification=()=>{
//     dispatch(setIsNotification(false))
//   }
//   return (
  
//   <Dialog open={isNotification}  onClose={closeNotification}> 
//        <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
          
          
//            <DialogTitle>Notifications</DialogTitle>

                
//           {   isLoading? <Skeleton/>:

//              ( <>
//               {
//               data?.allRequests.length >0  ?
                   
//               (data?.allRequests?.map(({sender,_id})=>
//                 <NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id}/>
              
                      
//               )):
              
//               (<Typography textAlign={"center"}>Nothing to show here! </Typography>)
//             }
//               </>
//              )
//             }
//        </Stack>
//    </Dialog>
//   )
// }


// const NotificationItem=memo(({sender,_id,handler}) =>{
//   const {name,avatar} = sender
//   return(
// <ListItem >

// <Stack direction={"row"}
//   alignItems={"center"}
//   spacing={"1rem"}
//   width={"100%"}
// >

//    <Avatar src={avatar}/>
//    <Typography
//       variant='body1'
//       sx={{
//        flexGlow:1,
//        display:"-webkit-box",
//        WebkitLineClamp:1,
//        WebkitBoxOrient:"vertical",
//        overflow:"hidden",
//        textOverflow:"ellipsis",
//        width:"100%"
//       }}
//    >{` Friend Request from ${name}`}
//    </Typography>
//      <Stack direction={
//       {
//         xs:"column",
//         sm:"row"
//       }
//      }>
//        <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
//        <Button color='error' onClick={()=>handler({_id,accept:false})}>Reject</Button>
        
//      </Stack>
// </Stack>
// </ListItem>
  
//   )
// });
// export default Notifications



 



import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, Typography, ListItem, Avatar, IconButton, Button, Stack, Skeleton, Paper,Collapse,useMediaQuery  } from '@mui/material';
import { memo } from 'react';
import { useGetNotificationsQuery, useAcceptFriendRequestMutation } from '../../redux/reducers/api/api';
import { useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';
import { decrementNotification } from '../../redux/reducers/chat';
 
import { useState } from 'react';
// Main Notifications Component
const Notifications = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  useErrors([{ error, isError }]);
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept });
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(decrementNotification());
      } else {
        toast.error(res?.data?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
    closeNotification();
  };

  const closeNotification = () => {
    dispatch(setIsNotification(false));
  };

  return (
    <Dialog open={isNotification} onClose={closeNotification}
    PaperProps={{
      sx: {
        padding: { xs: "1.5rem", sm: "2rem" },
        borderRadius: "15px",
        background: "linear-gradient(135deg, #f1f2f6, #dfe4ea)",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
        width: { md: "25rem", sm: "20rem" }
      }
    }}
    
    >
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth="25rem" spacing={2}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>Notifications</DialogTitle>
        
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={100} />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests.map(({ sender, _id }) => (
                <NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id} />
              ))
            ) : (
              <Typography textAlign="center" variant="body1" color="text.secondary">
                Nothing to show here!
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

// Individual Notification Item Component
 
const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  
  // Use Material-UI's theme and media query hook
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  // Expandable state, only used for small screens
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    if (!isMdUp) setExpanded((prev) => !prev);
  };

  return (
    <ListItem disableGutters onClick={toggleExpand} sx={{ cursor: isMdUp ? 'default' : 'pointer' }}>
      <Paper
        elevation={expanded || isMdUp ? 4 : 2}
        sx={{
          width: '100%',
          p: 2,
          borderRadius: 2,
          backgroundColor: expanded || isMdUp ? '#f0f0f0' : '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <Avatar src={avatar} sx={{ width: 48, height: 48 }} />
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              whiteSpace: isMdUp ? 'normal' : 'nowrap',
              textOverflow: 'ellipsis',
              color: 'text.primary',
            }}
          >
            {name}
          </Typography>
        </Stack>

        {/* Show actions directly on larger screens; Collapse on smaller screens */}
        {(isMdUp || expanded) && (
          <Stack direction="row" spacing={1} mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // prevent Collapse from toggling
                handler({ _id, accept: true });
              }}
              sx={{ minWidth: '80px', fontSize: '0.875rem', textTransform: 'none' }}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handler({ _id, accept: false });
              }}
              sx={{ minWidth: '80px', fontSize: '0.875rem', textTransform: 'none' }}
            >
              Reject
            </Button>
          </Stack>
        )}
      </Paper>
    </ListItem>
  );
});


export default Notifications;
