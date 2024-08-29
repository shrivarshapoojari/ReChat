import React from 'react'
import { Dialog,DialogTitle,Typography,ListItem,Avatar ,IconButton, Button,Stack} from '@mui/material'
import { sampleNotifications } from '../../constants/sampleData'
import { memo } from 'react'
const Notifications = () => {

  const friendRequestHandler=({_id,accept})=>{
    console.log(_id,accept)
  }
  return (
   <Dialog open> 
       <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
           <DialogTitle>Notifications</DialogTitle>
             {
              sampleNotifications.length >0  ?
              
              (sampleNotifications?.map((i)=>
                <NotificationItem sender={i.sender} id={i._id} handler={friendRequestHandler} key={i._id}/>
              
           
              )):
              
              (<Typography textAlign={"center"}>Nothing to show here! </Typography>)
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
   >{`${name} wants to be your friend`}
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
