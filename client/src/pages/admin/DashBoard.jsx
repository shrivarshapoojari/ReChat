import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Container } from '@mui/material'
import {Stack }from '@mui/material'
import { AdminPanelSettings as AdminPanelIcon } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import {Typography} from '@mui/material'
import {Box} from '@mui/material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import NotificationIcon from '@mui/icons-material/Notifications';
import {Group as GroupIcon, Person as PersonIcon} from '@mui/icons-material'
const DashBoard = () => {
  const AppBar=(

    <Paper elevattion={3}
       sx={{
        padding:"2rem",
        margin:"2rem  0",
        borderRadius:"2rem"
       }}
    >
              <Stack  direction={"row"} alignItems={"center"} spacing={"1rem"}>
                     <AdminPanelIcon  sx={{
                         fontSize:"3rem",


                     }}/>
                    <SearchField/>
                    <CurveButton>
                        Search
                    </CurveButton>
                       <Box flexGrow={1}/>
                     <Typography  
                     display={
                            {xs:"none",sm:"block"}
                     }
                     >
                        {moment().format(" dddd ,MMMM Do YYYY")}
                     </Typography>
                     <NotificationIcon/>
              </Stack>

    </Paper>
  )

const Widgets=<Stack  direction={{
    xs:"column",
    sm:"row"
}}>
hi


</Stack>

    return <AdminLayout>
          <Container   component={"main"}>
                      {AppBar}

                       <Stack  direction={"row"} spacing={"2rem"} flexWrap={"wrap"} > 

                                 <Paper sx={{
                                    padding:"2rem 3.5rem",
                                    borderRadius:"1rem",
                                    width:"100%",
                                    maxWidth:"45rem",
                                    height:"25rem",
                                
                                    
                                 }} >
                                    <Typography variant='h5'>Total Users</Typography>
                                    <Typography variant='h5'>100</Typography>

                                 </Paper>
                                 <Paper   elevation={3}
                                 sx={{

                                    padding:"1rem",
                                    borderRadius:"1rem",
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    width:{xs:"100%" , sm:"50%"},
                                    position:"relative",
                                    width:"100%",
                                    maxWidth:"25rem",
                                    height:"25rem"
                                 }}
                                 
                                 >

                                    "Dougnut Chart"

                                    <Stack  position={"absolute"}
                                            direction={"row"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={"0.5rem"}
                                            width={"100%"}
                                            height={"100%"}
                                    >
                                             <GroupIcon/>   <Typography>vs</Typography>
                                             <PersonIcon/>

                                    </Stack>
                                 </Paper>
                       </Stack>


                       {
                        Widgets
                       }
          </Container>
    </AdminLayout>
  
}

 

export default DashBoard
