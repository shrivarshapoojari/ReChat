import React from 'react'
import { Avatar, AvatarGroup, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { transformImage } from '../../lib/features'
const AvatarCard = ({avatar=[],max=4}) => {
  return <Stack direction={"row"} spacing={0.5}>
    
    <AvatarGroup max={max}
      sx={
        {
         position:"relative"
        }
      }
     >
        <Box width={"5rem"} height={"3rem"}></Box>
      {
        avatar.map((i,index) =>(
            <Avatar
            key={Math.random()*100}
            src={transformImage(i)}
            alt="avatar"
            style={{
              width: "3rem",
              height: "3rem",
              border: "2px solid white",
              position:"absolute",
              left:{
                xs:`${0.5 + index}rem`,
                sm:`${index}rem`,
              }
              
            }}
            />
        ))
      }
    </AvatarGroup>
  </Stack>
}

export default AvatarCard
