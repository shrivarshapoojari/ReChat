import { Add } from '@mui/icons-material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'
import {memo} from 'react'
import { transformImage } from '../../lib/features';
const UserItem = ({user,handler,handlerIsLoading ,styling={},isAdded=false} ) => {

    const {name,_id,avatar} = user
   

    return (
     <ListItem >

         <Stack direction={"row"}
           alignItems={"center"}
           spacing={"1rem"}
           width={"100%"}
           {...styling}
         >

            <Avatar src={transformImage(avatar)}/>
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

                    bgcolor:  isAdded ? "error.main" :"primary.main",
                    color:"white",
                    "&:hover":{
                        bgcolor:isAdded ? "error.dark":"primary.dark"  
                 }}
                }
             
             onClick={()=>handler(_id)}  >
               {
                  isAdded ?<RemoveCircleOutlineIcon/> :  <Add/>
               }
               

             </IconButton>
         </Stack>
     </ListItem>
  )
}

export default memo(UserItem)
