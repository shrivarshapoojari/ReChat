import React from 'react'
import { Stack } from '@mui/material'
import { Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import {Face as FaceIcon,AlternateEmail as EmailIcon ,CalendarMonth as CalenderIcon} from '@mui/icons-material'
import moment from 'moment'
import { transformImage } from '../../lib/features'
const Profile = ({user}) => {
  // console.log(user.avatar)
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
          src={transformImage(user?.avatar?.url)}
          alt='user'
        
        
        />

      <ProfileCard  heading={"Bio"} text={user?.bio} />
      <ProfileCard  heading={"Username"} text={user?.username} Icon={<EmailIcon/>} />
      <ProfileCard  heading={"Name"} text={user?.name}   Icon={<FaceIcon/>}/>
      <ProfileCard  heading={"Joined"} text= {moment(user.createdAt).fromNow()}   Icon={<CalenderIcon/>}/>
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
