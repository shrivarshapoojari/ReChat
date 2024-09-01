import React, { lazy, memo, Suspense, useEffect } from 'react'
import { Backdrop, Box, Button, Drawer, Grid, Icon, IconButton, Stack, TextField, Tooltip,Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import {Add, Delete, Done, Menu as MenuIcon} from '@mui/icons-material'
import { Link } from '../components/styles/StyledComponents';
export const bgGradient = "linear-gradient(rgb(255 225 209), rgb(249 159 159))";
import AvatarCard from '../components/shared/AvatarCard';
import { sampleChats } from '../constants/sampleData';
import EditIcon from '@mui/icons-material/Edit';
const ConfirmDeleteDialog=lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"))
const Groups = () => {

const chatId=useSearchParams()[0].get("group")
  const navigate=useNavigate();
  const navigateBack=()=>{
    navigate("/")
  }

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const updateGroupNameHandler=()=>{
    setIsEdit(false)
    }

    const openconfirmDeleteHandler=()=>{
      setConfirmDeleteDialog(true)
    }

const closeConfirmDeleteHandler=()=>{
  setConfirmDeleteDialog(false)
}
    const openAddMember=()=>{
    }
    const [groupName, setGroupName] = useState("")
    const [groupNameUpdated, setGroupNameUpdated] = useState("")
  const handleMobileClose=()=>{
    setIsMobileMenuOpen(false)
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleMobile=()=>{
    setIsMobileMenuOpen((prev)=>!prev)
  }
  const deleteHandler=()=>{ 
    closeConfirmDeleteHandler();

  }

  useEffect(() => {
       setGroupName("Group Name")
       setGroupNameUpdated("Group Name")

       return () => {
          setGroupName("")
          setGroupNameUpdated("")
          setIsEdit(false)
        }
  },[chatId])
  const  IconBtns= <>
  
<Box    sx={{
    display:{
      xs:"block",
      sm:"none", 
      position:"fixed",
      right:"1rem",
      top:"1rem",
    }
  }}>
    <Tooltip title="Menu">
  <IconButton onClick={handleMobile}>

    <MenuIcon/>
  </IconButton>
  </Tooltip>
  </Box>
    <Tooltip title="back">
    <IconButton
    sx={{
      position:"absolute",
      top:"1rem",
      left:"1rem",
      bgcolor:"rgba(0,0,0,0.8)",
      color:"white",
      ":hover":{
        bgcolor:"rgba(0,0,0,0.6)"
      }
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
    </Tooltip>


    
  </>
  const GroupName= <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
    {isEdit ? <>
    <TextField value={groupNameUpdated} onChange={(e)=>setGroupNameUpdated(e.target.value)} />
    <IconButton onClick={()=>setIsEdit(false)}>
      <Done/>
      </IconButton>
     
    </> :<>
    <Typography variant='h4'>
     {groupName}
      </Typography>
      <IconButton onClick={updateGroupNameHandler}>
         <EditIcon/>
        </IconButton>
    </>}  
  </Stack>
  

  const ButtonGroup= <Stack
  direction={{
    xs:"column-reverse",
    sm:"row"
  }}
  spacing={"1rem"}
  p={{
    xs:"0",
    sm:"1rem",
    md:"1rem 4rem"

  }}
  >
<Button size='large' color='error' variant='outlined' startIcon={<Delete/>} onClick={openconfirmDeleteHandler}>Delete Group</Button>
<Button size='large'variant='contained' startIcon={<Add/>} onClick={openAddMember}>Add Member</Button>
  </Stack>
  return (
    <Grid container height={"100vh"}>
        <Grid
           item
          
            sx={
              {
                display:{
                   xs:"none",
                   sm:"block"
                }
                
              }
            }
            bgcolor={"gray"}
            sm={4}

           >
           <GroupList myGroups={sampleChats} chatId={chatId}/>
          
           </Grid>
           
           <Grid item sm={8} xs={12}
            sx={{
              display:"flex",
              flexDirection:"column",
              position:"relative",
              padding:"1rem 3rem",
              alignItems:"center"
            }}
           > 
            {IconBtns}
            {
              groupName&& <>
              

              {GroupName}
              <Typography margin={"2rem"}
              alignSelf={"flex-start"}
              variant='body1'
              
              >
                Members
              </Typography>
              <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm:"1rem",
                xs:"0",
                md:"1rem 4rem "
              }}
              spacing={"2rem"}
              bgcolor={"gray"}
              height={"50vh"}
              overflow={"auto"}
              >
             {/**Members */}
              </Stack>
                 {ButtonGroup}
              </>
            }
            </Grid>

            {
              confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
                         <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/>
                </Suspense>
            }
            <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
                   sx={{

              display:{
                xs:"block",
                sm:"none"
              }
                   }}
            >
              <GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
               
            </Drawer>

    </Grid>
  )
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundColor: bgGradient,
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
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});


export default Groups
