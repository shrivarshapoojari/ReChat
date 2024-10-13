import { Dialog, DialogTitle,InputAdornment,Stack,TextField,List, ListItem, ListItemText } from '@mui/material'
import React, { useEffect } from 'react'
import { useInputValidation } from '6pp'
import SearchIcon from '@mui/icons-material/Search';
import UserItem from '../shared/UserItem';
import { useState } from 'react';
import { sampleUsers } from '../../constants/sampleData';
import { useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useDispatch } from 'react-redux';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/reducers/api/api';
 import toast from 'react-hot-toast'
const Search = () => {
  const {isSearch}=useSelector((state)=>state.misc)
  const search=useInputValidation("")
  const dispatch=useDispatch();
    const[searchUser]=useLazySearchUserQuery()


   const [sendFriendRequest]=useSendFriendRequestMutation();

  const addFriendHandler=async(id)=>{
    try{
     const data= await sendFriendRequest({userId:id})
      if(data?.data?.success)
        toast.success("Friend Request sent")
     else
    {
      toast.error(data?.error?.data?.message)
    }
    }
    catch(e)
    {
        toast.error(e.message || "Something went wrong")
    }


 
  } 
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) =>setUsers(data.users))
        .catch((e)=>console.log());
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  
  let isLoadingSendFriendRequest=false
  const [users,setUsers]=useState(null)
    const searchCloseHandler=()=>{
      dispatch(setIsSearch(false))
    }
  return (
  <Dialog open={isSearch} onClose={searchCloseHandler} >
        <Stack p={"2rem"} direction={"column"} width={"25rem"}>
                <DialogTitle  textAlign={"center"}>Find Friends</DialogTitle>
                <TextField   label="" value={search.value} onChange={search.changeHandler}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <SearchIcon/>
                      </InputAdornment>
                    )
                  }}
                
                
                /> 

                <List>
                  
                  

                        {
                          users?.map((user) =>
                          
                            <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
                            
                        )
                        }

                </List>
        </Stack>
    </Dialog>
  )
}

export default Search
