import React from 'react'
import { Dialog, DialogTitle, Typography, Stack, TextField, Button, Skeleton } from '@mui/material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampleData'
import { useState } from 'react'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery } from '../../redux/reducers/api/api'
import { useErrors } from '../../hooks/hook'
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'
const NewGroup = () => {
const dispatch=useDispatch()
const {isNewGroup}=useSelector((state)=>state.misc)
const {isError,isLoading,error,data}=useAvailableFriendsQuery()
 
const errors=[{isError:error,error:error}]


useErrors(errors)
  const [users,setUsers]=useState(sampleUsers)
  
  const submitHandler=()=>{
if(!groupName.value)
  return toast.error("Groupname is required")

if(selectedMembers.length<2)
  return toast.error("Atleast 2 members required to create a group")
               













closeHandler();
  }
  const closeHandler=()=>{
    dispatch(setIsNewGroup(false))
  }
    
   const [selectedMembers,setSelectedMembers]=useState([])
   const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

 
  const groupName=useInputValidation("")
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant={"h4"}>New Group</DialogTitle>
        <TextField label={"Group Name"}  value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1' > Members</Typography>  
        <Stack>
        {isLoading ? <Skeleton/> :
          data?.friends?.map((user) =>

            <UserItem user={user} key={user._id} handler={selectMemberHandler}   isAdded={selectedMembers.includes(user._id)}/>
          )
        }
        </Stack>
        <Stack direction={"row"}  justifyContent={'space-evenly'}>
          <Button variant='outlined' color='error' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' onClick={submitHandler}>Create</Button>
        </Stack>
          
      </Stack>
    </Dialog>
  )
}

export default NewGroup
