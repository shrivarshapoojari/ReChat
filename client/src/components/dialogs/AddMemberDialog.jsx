import React from 'react'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import {DialogTitle} from '@mui/material'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useState } from 'react'


const AddMemberDialog = ({addMember,isLoadingAddMemeber,chatId}) => {
    
        const addFriendHandler=(userId)=>{
             
        }
        const addMemberSubmitHandler=()=>{  
        }
        const closeHandler=()=>{
        }
  return (
    <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
                <DialogTitle textAlign={"center"}>
                    Add Member
                </DialogTitle>
                <Stack spacing={"1rem"}>
                     {
                        sampleUsers.length>0 ? sampleUsers.map((user)=>(

                            <UserItem key={user.id} user={user} handler={addFriendHandler}/>
                        )
                        ) : <Typography textAlign={"center"}>No users</Typography>
                     }
                </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                <Button variant='outlined' color='error' onClick={closeHandler}>Cancel</Button>
                <Button variant='contained' disabled={isLoadingAddMemeber} onClick={addMemberSubmitHandler}>Add</Button>
                </Stack>
            </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
