import React from 'react'
import { Dialog,DialogTitle,Typography,ListItem,Avatar ,IconButton, Button,Stack, Skeleton} from '@mui/material'
import { sampleNotifications } from '../../constants/sampleData'
import { memo } from 'react'
import { useGetNotificationsQuery } from '../../redux/reducers/api/api'
import { useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'
import { useAcceptFriendRequestMutation } from '../../redux/reducers/api/api'
import { decrementNotification } from '../../redux/reducers/chat'
const Notifications = () => {
  const dispatch=useDispatch();
  const { isNotification}=useSelector((state)=>state.misc)    
  const{isLoading ,data,error,isError}=useGetNotificationsQuery()
  
  useErrors([{error,isError}])
    const[acceptFriendRequest]=useAcceptFriendRequestMutation();



  const friendRequestHandler=async({_id,accept})=>{
 



  try{
   const res= await acceptFriendRequest({requestId:_id,accept})
 
   if(res?.data?.success){ 
      toast.success(res.data.message)
      dispatch(decrementNotification())
   }
   else{
      toast.error(res?.data?.message || "Something went wrong")
   }
 
  }catch(error){
     toast.error(error)
  }
     
      closeNotification();
   
  }
  const closeNotification=()=>{
    dispatch(setIsNotification(false))
  }
  return (
  
  <Dialog open={isNotification}  onClose={closeNotification}> 
       <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
          
          
           <DialogTitle>Notifications</DialogTitle>

                
          {   isLoading? <Skeleton/>:

             ( <>
              {
              data?.allRequests.length >0  ?
                   
              (data?.allRequests?.map(({sender,_id})=>
                <NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id}/>
              
                      
              )):
              
              (<Typography textAlign={"center"}>Nothing to show here! </Typography>)
            }
              </>
             )
            }
       </Stack>
   </Dialog>
  )
}


const NotificationItem=memo(({sender,_id,handler}) =>{
  const {name,avatar} = sender
  return(
<ListItem >

<Stack direction={"row"}
  alignItems={"center"}
  spacing={"1rem"}
  width={"100%"}
>

   <Avatar src={avatar}/>
   <Typography
      variant='body1'
      sx={{
       flexGlow:1,
       display:"-webkit-box",
       WebkitLineClamp:1,
       WebkitBoxOrient:"vertical",
       overflow:"hidden",
       textOverflow:"ellipsis",
       width:"100%"
      }}
   >{` Friend Request from ${name}`}
   </Typography>
     <Stack direction={
      {
        xs:"column",
        sm:"row"
      }
     }>
       <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
       <Button color='error' onClick={()=>handler({_id,accept:false})}>Reject</Button>
        
     </Stack>
</Stack>
</ListItem>
  
  )
});
export default Notifications
