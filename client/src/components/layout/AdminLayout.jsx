import React, { Children } from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { Stack } from '@mui/material';
import { useState } from 'react';
import {useLocation} from 'react-router-dom';
const SideBar = ({w="100%"}) => {
   
   const location=useLocation();
   
   return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant={"h5"} textTransform={"uppercase"}>RECHAT</Typography>  
                        <Stack spacing={"1rem"}>
                             




                          </Stack>

    </Stack>
}

const AdminLayout = ({children}) => {

    const [isMobile, setIsMobile] = useState(false);

   const handleMobile =()=>{setIsMobile(!isMobile)};
   const handleClose =()=>{setIsMobile(false)};

   

  return (
    <Grid  container minHeight={"100vh"}>
           <Box
             sx={{

                display: {xs: 'block', md: 'none'},
                position: 'fixed',
                right:'1rem',
                top: '1rem',
             }}
           
           >

            <IconButton onClick={handleMobile}>
               { isMobile?   <Close/>:<MenuIcon/>}
            </IconButton>

           </Box>

        <Grid 
         item
         md={4}
         lg={3}
         sx={{display: {xs: 'none', md: 'block'}}}

        >
            <SideBar/>
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
                      <SideBar w="50vw"/>
              </Drawer>
    </Grid>
  )
}

export default AdminLayout
