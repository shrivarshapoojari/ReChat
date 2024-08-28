import { Add } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'
import {memo} from 'react'
const UserItem = ({user,handler,handlerIsLoading}) => {

    const {name,_id,avatar} = user
   

    return (
     <ListItem >

         <Stack direction={"row"}
           alignItems={"center"}
           spacing={"1rem"}
           width={"100%"}
         >

            <Avatar/>
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
            >{name}
            </Typography>
             <IconButton
                 size='small'
                 sx={{

                    bgcolor:"primary.main",
                    color:"white",
                    "&:hover":{
                        bgcolor:"primary.dark"  
                 }}
                }
             
             onClick={()=>handler(_id)} disable={handlerIsLoading}>
                <Add/>

             </IconButton>
         </Stack>
     </ListItem>
  )
}

export default memo(UserItem)
