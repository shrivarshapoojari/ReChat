import React from 'react'
import { Dialog, DialogTitle, Typography, Stack, TextField, Button } from '@mui/material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampleData'
import { useState } from 'react'
import { useInputValidation } from '6pp'
const NewGroup = () => {
  const [users,setUsers]=useState(sampleUsers)
  
  const submitHandler=()=>{

  }
  const closeHandler=()=>{
  }
   const [members ,setMembers]=useState(sampleUsers);
   const [selectedMembers,setSelectedMembers]=useState([])
   const selectMemberHandler=(id)=>{
      setMembers((prev)=> prev.map((user)=> user._id===id ? {...user,isAdded:!user.isAdded} : user))
    setSelectedMembers((prev)=> prev.includes(id)? prev.filter((i)=> i!==id) : [...prev ,id])
   }
   console.log(selectedMembers)
  const groupName=useInputValidation("")
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant={"h4"}>New Group</DialogTitle>
        <TextField label={"Group Name"}  value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1' > Members</Typography>  
        <Stack>
        {
          members?.map((user) =>

            <UserItem user={user} key={user._id} handler={selectMemberHandler} />
          )
        }
        </Stack>
        <Stack direction={"row"}  justifyContent={'space-evenly'}>
          <Button variant='outlined' color='error'>Cancel</Button>
          <Button variant='contained' onClick={submitHandler}>Create</Button>
        </Stack>
          
      </Stack>
    </Dialog>
  )
}

export default NewGroup
