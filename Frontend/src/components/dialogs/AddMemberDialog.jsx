import React from 'react'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import { DialogTitle } from '@mui/material'
 
import UserItem from '../shared/UserItem'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import {Skeleton} from '@mui/material'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/reducers/api/api'
const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();

    const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation)
    const {isLoading,data,isError,error}=useAvailableFriendsQuery(chatId)
     
    useErrors([{isError,error}])
   
    const {isAddMember}=useSelector((state)=>state.misc)
     
    const [selectedMembers, setSelectedMembers] = useState([])
    const selectMemberHandler = (id) => {
        
        setSelectedMembers((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
    }




    const addMemberSubmitHandler = () => {
        addMember("Adding...",{members:selectedMembers,chatId})
        closeHandler()
    }
    const closeHandler = () => {
        dispatch(setIsAddMember(false))
        
    }
    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
                <DialogTitle textAlign={"center"}>
                    Add Member
                </DialogTitle>
                <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Button variant='outlined' color='error' onClick={closeHandler}>Cancel</Button>
                    <Button variant='contained' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>Add</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog
