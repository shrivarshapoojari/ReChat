import { Add, Delete, Done, Menu as MenuIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutLoader } from '../components/layout/Loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/styles/StyledComponents';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/reducers/api/api';
import { setIsAddMember } from '../redux/reducers/misc';
import { Paper } from '@mui/material';
import Header from '../components/layout/Header';
export const bgGradient = "linear-gradient(rgb(255 225 209), rgb(249 159 159))";
const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))

const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))
const Groups = () => {


  const { isAddMember } = useSelector((state) => state.misc)
  const dispatch = useDispatch();
  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/")
  }

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
    navigate("/");
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
          top: "1rem",
          left: "1rem",
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
        <EditIcon />
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



  return  myGroups.isLoading ? <LayoutLoader /> :(
    <>
    <Header/>
    <Grid container maxHeight={"80vh"}>
      <Grid
        item

        sx={
          {
            display: {
              xs: "none",
              sm: "block"
            }

          }
        }

        sm={4}

      >
        <Paper
          elevation={5}
          maxHeight={"80vh"}
        >
          <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
        </Paper>
      </Grid>

      <Grid item sm={8} xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
          alignItems: "center"
        }}
      >

        {IconBtns}
          <Typography variant='h4' margin={"0.2rem"}>Manage Groups</Typography>
        {
          groupName && <>


            {GroupName}
            <Typography margin={"2rem"}
              alignSelf={"flex-start"}
              variant='h5'

            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem "
              }}
              spacing={"2rem"}

              height={"50vh"}
              overflow={"auto"}
            >
              {/**Members */}
              {

                members.map((user) => (

                  <UserItem
                    key={user._id}
                    user={user}
                    isAdded={true}
                    handler={removeMemberHandler} styling={
                      {
                        boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                        padding: "1rem",
                        borderRadius: "1rem"
                      }

                    } />
                ))
              }
            </Stack>
            {ButtonGroup}
          </>
        }
      </Grid>

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} />
        </Suspense>
      }

      {
        isAddMember && <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      }
      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
        sx={{

          display: {
            xs: "block",
            sm: "none"
          }
        }}
      >
        <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId} />

      </Drawer>

    </Grid>
    </>
  )
}














const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{

      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

















const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}

      >
        <AvatarCard avatar={avatar}

        />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});


export default Groups
