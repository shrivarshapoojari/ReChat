 import { Dialog, DialogTitle, InputAdornment, Stack, TextField, List, ListItem, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useInputValidation } from '6pp'
import SearchIcon from '@mui/icons-material/Search'
import UserItem from '../shared/UserItem'


import { useSelector, useDispatch } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/reducers/api/api'
import toast from 'react-hot-toast'

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc)
  const [isLoadingFriendRequest, setLoadingFriendRequest] = useState(false)
  const search = useInputValidation("")
  const dispatch = useDispatch()
  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest] = useSendFriendRequestMutation()
  const [users, setUsers] = useState(null)

  const addFriendHandler = async (id) => {
    try {
      let loadId
      setLoadingFriendRequest(true)
      loadId = toast.loading("Sending Friend Request")
      const data = await sendFriendRequest({ userId: id })
      setLoadingFriendRequest(false)
      toast.dismiss(loadId)
      if (data?.data?.success)
        toast.success("Friend Request Sent")
      else {
        toast.error(data?.error?.data?.message)
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong")
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log())
    }, 1000)

    return () => {
      clearTimeout(timeOutId)
    }
  }, [search.value])

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false))
  }

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}   
    PaperProps={{
      sx: {
        padding: { xs: "1.5rem", sm: "2rem" },
        borderRadius: "15px",
        background: "linear-gradient(135deg, #f1f2f6, #dfe4ea)",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
        width: { md: "25rem", xs: "30rem" }
      }
    }}
    >
      <Stack p={"2rem"} direction={"column"} spacing={2} 
      
      sx=
      {{ 
        width:"100%"
        
        
        }}
      
      >
        <DialogTitle textAlign={"center"} sx={{ color: "#007bff", fontWeight: "bold" }}>
          Find Friends
        </DialogTitle>
        <TextField
          placeholder="Search for friends..."

          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          sx={{
          width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              paddingLeft: "0.5rem",
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
        <List sx={{
          maxHeight: "200px",
          overflowY: "auto",
          width:"100%",
          "& .MuiListItem-root": {
            padding: "0.5rem 1rem",
            margin: "0.5rem 0",
            borderRadius: "10px",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "#e8f0fe"
            }
          }
        }}>
          {users?.map((user) =>
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingFriendRequest}
            />
          )}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search
