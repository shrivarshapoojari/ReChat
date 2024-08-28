import React from 'react'
import { Dialog,DialogTitle,Stack } from '@mui/material'
import { sampleNotifications } from '../../constants/sampleData'
const Notifications = () => {
  return (
   <Dialog open> 
       <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
           <DialogTitle>Notifications</DialogTitle>
             {
              sampleNotifications.length >0  ?
              
              (<>
              </> ):
              
              (<Typography textAlign={"center"}>Nothing to show here! </Typography>)
             }
       </Stack>
   </Dialog>
  )
}

export default Notifications
