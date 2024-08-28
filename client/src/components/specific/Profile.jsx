import React from 'react'
import { Stack } from '@mui/material'
import { Avatar } from '@mui/material'
import { Typography } from '@mui/material'
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
          sx={{

            width:200,
            height:200,
            objectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid white"

          }}
        
        
        />

      <ProfileCard />
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
