import React from 'react'
import { Grid, IconButton, Typography,styled } from '@mui/material'
import { Box } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Link as LinkComponent} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { Navigate } from 'react-router-dom';
const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;


const isAdmin = true;


const  adminTabs=[
   {

   name:"Dashboard",
   path:"/admin/dashboard",
   icon:<DashboardIcon/>
},
   {

   name:"Users",
   path:"/admin/users-management",
   icon:<ManageAccountsIcon/>
},
    


]

const logouthandler=()=>{
   console.log("logout");
}
const SideBar = ({ w = "100%" }) => {

   const location = useLocation();

   return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant={"h5"} textTransform={"uppercase"}>RECHAT</Typography>
      <Stack spacing={"1rem"}>

         {


            adminTabs.map((tab) => (
               <Link key={tab.path} to ={tab.path}
                   sx={

                     location.pathname === tab.path &&
                     {
                            bgcolor: 'black',
                            color:"white",
                              "&:hover": {
                                 color: "white"
                              }
                     }

                   }
               >
                   <Stack  direction={"row"} alignItems={"center"} spacing={"1rem"}>
                             {tab.icon}
                             <Typography >{tab.name}</Typography>
                   </Stack>
               </Link>
            )
                   )     }

             <Link>
                   <Stack  direction={"row"} alignItems={"center"} spacing={"1rem"}>
                              <ExitToApp/>
                             <Typography >Logout</Typography>
                   </Stack>
               </Link>

      </Stack>

   </Stack>
}

const AdminLayout = ({ children }) => {

   const [isMobile, setIsMobile] = useState(false);

   const handleMobile = () => { setIsMobile(!isMobile) };
   const handleClose = () => { setIsMobile(false) };
   if(!isAdmin){
      return   <Navigate to="admin/login"/>
   }


   return (
      <Grid container minHeight={"100vh"}>
         <Box
            sx={{

               display: { xs: 'block', md: 'none' },
               position: 'fixed',
               right: '1rem',
               top: '1rem',
            }}

         >

            <IconButton onClick={handleMobile}>
               {isMobile ? <Close /> : <MenuIcon />}
            </IconButton>

         </Box>

         <Grid
            item
            md={4}
            lg={3}
            sx={{ display: { xs: 'none', md: 'block' } }}

         >
            <SideBar />
         </Grid>
         <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
               backgroundColor: '#f5f5f5',
               padding: 2,
               overflowY: 'auto'
            }
            }


         >
            {children}
         </Grid>
         <Drawer open={isMobile} onClose={handleClose}>
            <SideBar w="50vw" />
         </Drawer>
      </Grid>
   )
}

export default AdminLayout
