import { Add, Delete, Done, Menu as MenuIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Backdrop, Box, Button, IconButton, Skeleton, Stack, TextField, Tooltip, Typography, Dialog, Paper } from '@mui/material';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserItem from '../components/shared/UserItem';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/reducers/api/api';
import { setIsAddMember, setIsManageGroup } from '../redux/reducers/misc';

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"));

const ManageGroup = ({ isGroupAdmin }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const chatId = params.chatId;

  const { isManageGroup, isAddMember } = useSelector((state) => state.misc);
  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const errors = [{ isError: myGroups.isError, error: myGroups.error }, { isError: groupDetails?.isError, error: groupDetails?.error }];
  useErrors(errors);

  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdated, setGroupNameUpdated] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  useEffect(() => {
    if (groupDetails.data) {
      setMembers(groupDetails?.data?.chat?.members);
      setGroupName(groupDetails?.data?.chat?.name);
      setGroupNameUpdated(groupDetails?.data?.chat?.name);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
      setMembers([]);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    dispatch(setIsManageGroup(false));
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member", { chatId, userId });
  };

  const updateGroupNameHandler = () => {
    setIsEdit(true);
  };

  const changeGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating GroupName", { chatId, name: groupNameUpdated });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMember = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group", chatId);
    dispatch(setIsManageGroup(false));
    closeConfirmDeleteHandler();
  };

  const IconBtns = (
    <Box
      sx={{
        display: { xs: "block", sm: "none" },
        position: "fixed",
        right: "1rem",
        top: "1rem",
      }}
    >
      <Tooltip title="Menu">
        <IconButton onClick={() => setIsEdit(!isEdit)}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const GroupName = (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing="1rem" padding="2rem">
      {isEdit ? (
        <>
          <TextField value={groupNameUpdated} onChange={(e) => setGroupNameUpdated(e.target.value)} fullWidth variant="outlined" />
          <IconButton onClick={changeGroupName} disabled={isLoadingGroupName} color="primary">
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{groupName}</Typography>
          {isGroupAdmin && (
            <IconButton onClick={updateGroupNameHandler} disabled={isLoadingGroupName} color="primary">
              <EditIcon />
            </IconButton>
          )}
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing="1rem" p={{ xs: "0", sm: "1rem" }} alignSelf="center">
      <Button variant="outlined" color="error" startIcon={<Delete />} onClick={openConfirmDeleteHandler} fullWidth>
        Delete Group
      </Button>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={openAddMember} fullWidth>
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Dialog open={isManageGroup} onClose={() => dispatch(setIsManageGroup(false))} maxWidth="md" 
    PaperProps={{
      sx: {
        borderRadius: "15px",
        
      }
    }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          // background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
          borderRadius: '1rem',
         
        background: "linear-gradient(135deg, #f1f2f6, #dfe4ea)",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.2)"
        }}
      >
        <Stack spacing={3} alignItems="center"
             sx={{
              height: '80vh',
             }}
        >
          {IconBtns}
          <Typography variant="h4" sx={{ fontWeight: '600', color: '#343a40' }}>
            {isGroupAdmin ? "Manage Group" : "Group Info"}
          </Typography>

          {groupName && (
            <>
              {GroupName}
              <Typography variant="h6" alignSelf="flex-start" sx={{ mt: '1rem', fontWeight: 'bold' }}>
                Members
              </Typography>
              <Stack
                maxWidth="100%"
                width="100%"
                boxSizing="border-box"
                spacing="1rem"
                padding="1rem"
                sx={{
                  borderRadius: '1rem',
                  overflowY: 'auto',
                  maxHeight: '50vh',
                  backgroundColor: '#f8f9fa',
                  boxShadow: 'inset 0 0 1rem rgba(0,0,0,0.1)',
                }}
              >
                {members.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isAdded={true}
                    isGroupInfo={!isGroupAdmin}
                    handler={isGroupAdmin ? removeMemberHandler : null}
                    styling={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 0 0.5rem rgba(0,0,0,0.1)',
                    }}
                  />
                ))}
              </Stack>
              {isGroupAdmin && ButtonGroup}
            </>
          )}

          {confirmDeleteDialog && (
            <Suspense fallback={<Backdrop open />}>
              <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} />
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
