
import { Add, Delete, Done, Menu as MenuIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Backdrop, Box, Button, Grid, IconButton, Skeleton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserItem from '../components/shared/UserItem';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/reducers/api/api';
import { setIsAddMember, setIsManageGroup } from '../redux/reducers/misc';
import {Dialog} from '@mui/material'
import {Paper} from '@mui/material'
import { useLocation } from 'react-router-dom';
const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))

const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const ManageGroup = ({isGroupAdmin}) => {
   

  
  
  const { isAddMember } = useSelector((state) => state.misc)
  const dispatch = useDispatch();
  
  const navigateBack = () => {
     dispatch(setIsManageGroup(false))

  }
  
  const params = useParams();
  const chatId = params.chatId
   
const {isManageGroup}=useSelector((state)=>state.misc)
  const myGroups = useMyGroupsQuery("")

  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId })
 

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)
  const errors = [{ isError: myGroups.isError, error: myGroups.error },

  { isError: groupDetails?.isError, error: groupDetails?.error },
  ]
  
  useErrors(errors)
  

  const [members, setMembers] = useState([]);
  useEffect(() => {

    if (groupDetails.data) {
      setMembers(groupDetails?.data?.chat?.members)
      setGroupName(groupDetails?.data?.chat?.name)
      setGroupNameUpdated(groupDetails?.data?.chat?.name)
    }
    return () => {
      return () => {
        setGroupName("")
        setGroupNameUpdated("")
        setIsEdit(false)
        setMembers([])
      }
    }
  }, [groupDetails.data])








  const removeMemberHandler = (userId) => {
   
    removeMember("Removing Member", { chatId, userId })
     
      
    
  }

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const updateGroupNameHandler = () => {
    setIsEdit(true)

  }
  const changeGroupName = () => {
    setIsEdit(false)
    updateGroup("Updating GroupName", { chatId, name: groupNameUpdated })
  }

  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openAddMember = () => {
    dispatch(setIsAddMember(true))
  }
  const [groupName, setGroupName] = useState("")
  const [groupNameUpdated, setGroupNameUpdated] = useState("")
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }
  const deleteHandler = () => {
    deleteGroup("Deleting Group", chatId)
   dispatch(setIsManageGroup(false))
    closeConfirmDeleteHandler();

  }

  const IconBtns = <>

    <Box sx={{
      display: {
        xs: "block",
        sm: "none",
        position: "fixed",
        right: "1rem",
        top: "1rem",
      }
    }}>
      <Tooltip title="Menu">
        <IconButton onClick={handleMobile}>

          <MenuIcon />
        </IconButton>
      </Tooltip>
    </Box>
    <Tooltip title="back">
      <IconButton
        sx={{
          position: "absolute",
          top:  {md:"1rem",xs:"-2.5rem"},
          left: {md:"1rem",xs:"-1.9rem"},
          
          bgcolor: "rgba(0,0,0,0.8)",
          color: "white",
          ":hover": {
            bgcolor: "rgba(0,0,0,0.6)"
          }
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>



  </>
  const GroupName = <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
    {isEdit ? <>
      <TextField value={groupNameUpdated} onChange={(e) => setGroupNameUpdated(e.target.value)} />
      <IconButton onClick={changeGroupName} disabled={isLoadingGroupName}>
        <Done />
      </IconButton>

    </> : <>
      <Typography variant='h4'>
        {groupName}
      </Typography>
      <IconButton onClick={updateGroupNameHandler} disabled={isLoadingGroupName}>
          { 
            isGroupAdmin && (
              <EditIcon />)

          }
      </IconButton>
    </>}
  </Stack>


  const ButtonGroup = <Stack
    direction={{
      xs: "column-reverse",
      sm: "row"
    }}
    spacing={"1rem"}
    p={{
      xs: "0",
      sm: "1rem",
      md: "1rem 4rem"

    }}
  >
    <Button size='large' color='error' variant='outlined' startIcon={<Delete />} onClick={openconfirmDeleteHandler}>Delete Group</Button>
    <Button size='large' variant='contained' startIcon={<Add />} onClick={openAddMember}>Add Member</Button>
  </Stack>


const closeHandler=()=>{
  dispatch(setIsManageGroup(false))
}



  return  isLoadingGroupName ?<Skeleton/> :(
    <Dialog open={isManageGroup} onClose={closeHandler}  maxWidth="md"
     
    >
    <Paper 
      elevation={3}
      sx={{ padding: '2rem', position: 'relative',
         background: "white"
       }}
    >
      <Stack 
        spacing={2} 
        alignItems="center"
        sx={{ width: '100%', position: 'relative' ,height:'80vh' }}
      >
        {IconBtns}
        <Typography variant="h4" margin="0.2rem">
         {isGroupAdmin ? "Manage Group" : "Group Info"}
        </Typography>

        {groupName && (
          <>
            {GroupName}
            <Typography margin="2rem" alignSelf="flex-start" variant="h5">
              Members
            </Typography>
            <Stack
              maxWidth="45rem"
              width="100%"
              boxSizing="border-box"
              padding={{ sm: '1rem', xs: '0', md: '1rem 4rem' }}
              spacing="2rem"
              height="50vh"
              overflow="auto"
            >
              {members.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  isAdded={true}
                  isGroupInfo={!isGroupAdmin}
                  handler={ isGroupAdmin ?removeMemberHandler:()=>{}}
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                    padding: '1rem',
                    borderRadius: '1rem',
                  }}
                />
              ))}
            </Stack>
            { isGroupAdmin && ButtonGroup}
          </>
        )}

        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog 
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )}

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )}
      </Stack>
    </Paper>
  </Dialog>
  );


 
};

export default ManageGroup;
