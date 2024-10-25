import Close from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToApp from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, IconButton, Stack, Typography, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkComponent, useLocation, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../redux/thunks/admin';
 
const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

 


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



const SideBar = ({ w = "100%" }) => {

   const location = useLocation();
   const dispatch=useDispatch();
   const logouthandler=()=>{
           dispatch(adminLogout())
   }

   return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"} >
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
                             <Typography  
                                onClick={logouthandler}
                             
                             >Logout</Typography>
                   </Stack>
               </Link>

      </Stack>

   </Stack>
}

const AdminLayout = ({ children }) => {
 
   const {isAdmin}=useSelector((state)=>state.auth)
   const [isMobile, setIsMobile] = useState(false);
        const navigate=useNavigate();
   const handleMobile = () => { setIsMobile(!isMobile) };
   const handleClose = () => { setIsMobile(false) };
   useEffect(()=>{
      if(!isAdmin){
         return    navigate("/admin")
      }
   },[isAdmin])
  


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
