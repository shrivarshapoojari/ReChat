import React from 'react'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import {DialogTitle} from '@mui/material'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useState } from 'react'


const AddMemberDialog = ({addMember,isLoadingAddMemeber,chatId}) => {
     
    const [members ,setMembers]=useState(sampleUsers);
   const [selectedMembers,setSelectedMembers]=useState([])
   const selectMemberHandler=(id)=>{
      setMembers((prev)=> prev.map((user)=> user._id===id ? {...user,isAdded:!user.isAdded} : user))
    setSelectedMembers((prev)=> prev.includes(id)? prev.filter((i)=> i!==id) : [...prev ,id])
   }



         
        const addMemberSubmitHandler=()=>{  
            closeHandler()
        }
        const closeHandler=()=>{
            setSelectedMembers([])
            setMembers([])
        }
  return (
    <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
                <DialogTitle textAlign={"center"}>
                    Add Member
                </DialogTitle>
                <Stack spacing={"1rem"}>
                     {
                        members.length>0 ? members.map((user)=>(

                            <UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
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
