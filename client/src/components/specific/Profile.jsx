import React from 'react'
import { Stack } from '@mui/material'
import { Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import {Face as FaceIcon,AlternateEmail as EmailIcon ,CalendarMonth as CalenderIcon} from '@mui/icons-material'
import moment from 'moment'
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
          sx={{

            width:200,
            height:200,
            objectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid white",
             
          }}
        
        
        />

      <ProfileCard  heading={"Bio"} text={"Shrivarsha Poojary"} />
      <ProfileCard  heading={"Username"} text={"Shrivarsha Poojary"} Icon={<EmailIcon/>} />
      <ProfileCard  heading={"Name"} text={"Shrivarsha Poojary"}   Icon={<FaceIcon/>}/>
      <ProfileCard  heading={"Joined"} text= {moment('2024-12-04T18:30:00.000Z').fromNow()}   Icon={<CalenderIcon/>}/>
      </Stack>
  )
}

const ProfileCard = ({text,Icon,heading}) =>  
(
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
         {Icon  && Icon}
         <Stack>
                <Typography variant="body1">{text}</Typography>
                <Typography variant="caption" color="gray">{heading}</Typography>
         </Stack>


    </Stack>
)
export default Profile
