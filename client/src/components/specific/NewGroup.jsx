// import React from 'react'
// import { Dialog, DialogTitle, Typography, Stack, TextField, Button, Skeleton } from '@mui/material'
// import UserItem from '../shared/UserItem'
// import { sampleUsers } from '../../constants/sampleData'
// import { useState } from 'react'
// import { useInputValidation } from '6pp'
// import { useDispatch, useSelector } from 'react-redux'
// import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/reducers/api/api'
// import { useAsyncMutation, useErrors } from '../../hooks/hook'
// import { setIsNewGroup } from '../../redux/reducers/misc'
// import toast from 'react-hot-toast'
// const NewGroup = () => {
// const dispatch=useDispatch()
// const {isNewGroup}=useSelector((state)=>state.misc)
// const {isError,isLoading,error,data}=useAvailableFriendsQuery()
// const[newGroup,isLoadingNewgroup]=useAsyncMutation(useNewGroupMutation)
// const errors=[{isError,error}]


// useErrors(errors)
//   const [users,setUsers]=useState(sampleUsers)
  
//   const submitHandler=()=>{
// if(!groupName.value)
//   return toast.error("Groupname is required")

// if(selectedMembers.length<2)
//   return toast.error("Atleast 2 members required to create a group")
               

// newGroup("Creating New Group",{name:groupName.value,members:selectedMembers})











// closeHandler();
//   }
//   const closeHandler=()=>{
//     dispatch(setIsNewGroup(false))
//   }
    
//    const [selectedMembers,setSelectedMembers]=useState([])
//    const selectMemberHandler = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currElement) => currElement !== id)
//         : [...prev, id]
//     );
//   };

 
//   const groupName=useInputValidation("")
//   return (
//     <Dialog open={isNewGroup} onClose={closeHandler}>
//       <Stack p={{ xs: "1rem", sm: "2rem" }} 
//        sx={{
//         width: { md: "25rem", sm: "12rem" },
//        }}
//        >
//         <DialogTitle textAlign={"center"} variant={"h4"}>New Group</DialogTitle>
//         <TextField label={"Group Name"}  value={groupName.value} onChange={groupName.changeHandler}/>
//         <Typography variant='body1' > Members</Typography>  
//         <Stack>
//         {isLoading ? <Skeleton/> :
//           data?.friends?.map((user) =>

//             <UserItem user={user} key={user._id} handler={selectMemberHandler}   isAdded={selectedMembers.includes(user._id)}/>
//           )
//         }
//         </Stack>
//         <Stack direction={"row"}  justifyContent={'space-evenly'}>
//           <Button variant='outlined' color='error' onClick={closeHandler}>Cancel</Button>
//           <Button variant='contained' onClick={submitHandler} disabled={isLoadingNewgroup}>Create</Button>
//         </Stack>
          
//       </Stack>
//     </Dialog>
//   )
// }

// export default NewGroup



import React, { useState } from 'react'
import { Dialog, DialogTitle, Typography, Stack, TextField, Button, Skeleton } from '@mui/material'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/reducers/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'

const NewGroup = () => {
  const dispatch = useDispatch()
  const { isNewGroup } = useSelector((state) => state.misc)
  const { isError, isLoading, error, data } = useAvailableFriendsQuery()
  const [newGroup, isLoadingNewgroup] = useAsyncMutation(useNewGroupMutation)
  const errors = [{ isError, error }]

  useErrors(errors)

  const [users, setUsers] = useState(data?.friends || [])
  const [selectedMembers, setSelectedMembers] = useState([])
  const groupName = useInputValidation("")

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]
    )
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required")
    if (selectedMembers.length < 2) return toast.error("At least 2 members are required to create a group")
    newGroup("Creating New Group", { name: groupName.value, members: selectedMembers })
    closeHandler()
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler} PaperProps={{
      sx: {
        padding: { xs: "1.5rem", sm: "2rem" },
        borderRadius: "15px",
        background: "linear-gradient(135deg, #f1f2f6, #dfe4ea)",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
        width: { md: "25rem", sm: "20rem" }
      }
    }}>
      <DialogTitle textAlign={"center"} variant="h5" sx={{ color: "#007bff", fontWeight: "bold" }}>
        New Group
      </DialogTitle>

      <Stack spacing={2} alignItems="center">
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          value={groupName.value}
          onChange={groupName.changeHandler}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              boxShadow: "inset 0px 1px 4px rgba(0,0,0,0.1)"
            }
          }}
        />

        <Typography variant='body1' sx={{ fontWeight: "500", marginBottom: "0.5rem" }}>
          Members
        </Typography>

        <Stack spacing={1} sx={{ width: "100%", maxHeight: "200px", overflowY: "auto", padding: "0.5rem" }}>
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={closeHandler}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              padding: "0.5rem 1.5rem",
              "&:hover": {
                backgroundColor: "#f8d7da",
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={isLoadingNewgroup}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              padding: "0.5rem 1.5rem",
              "&:hover": {
                backgroundColor: "#0056b3",
              }
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
