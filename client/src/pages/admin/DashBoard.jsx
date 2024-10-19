import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Container, Skeleton } from '@mui/material'
import { Stack } from '@mui/material'
import { AdminPanelSettings as AdminPanelIcon } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import NotificationIcon from '@mui/icons-material/Notifications';
import { Group as GroupIcon, Person as PersonIcon } from '@mui/icons-material'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { useDashboardStatsQuery } from '../../redux/reducers/api/api'
import { useErrors } from '../../hooks/hook'
const DashBoard = () => {


   
    const {data,isLoading,isError,error}=useDashboardStatsQuery();
   
     const chats= data?.stats?.totalChatsCount
     const groups= data?.stats?.groupsCount
    useErrors([{isError,error}])

   const AppBar = (

       
      <Paper elevattion={3}
         sx={{
            padding: "2rem",
            margin: "2rem  0",
            borderRadius: "2rem"
         }}
      >
         <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <AdminPanelIcon sx={{
               fontSize: "3rem",


            }} />
            <SearchField />
            <CurveButton>
               Search
            </CurveButton>
            <Box flexGrow={1} />
            <Typography
               display={
                  { xs: "none", sm: "block" }
               }
            >
               {moment().format(" dddd ,MMMM Do YYYY")}
            </Typography>
            <NotificationIcon />
         </Stack>

      </Paper>
   )

   const Widgets = <Stack direction={{
      xs: "column",
      sm: "row"

   }
   }
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}>

      <Widget title={"Total Users"} value={data?.stats?.usersCount} icon={<GroupIcon />} />
      <Widget title={"Chats"} value={data?.stats?.totalChatsCount} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={data?.stats?.messagesCount} icon={<GroupIcon />} />


   </Stack>

   return isLoading ? (<Skeleton/>) 
       : <AdminLayout>
      <Container component={"main"}>
         {AppBar}

         <Stack
            direction={{
               xs: "column",
               md: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
               xs: "center",
               md: "stretch",
            }}
            sx={{ gap: "2rem" }}


         >

            <Paper
               elevation={3}
               sx={{
                  padding: "2rem 3.5rem",
                  borderRadius: "1rem",
                  width: { xs: "100%", md: "50%" },
                  maxWidth: "45rem",
               }}
            >
               <Typography variant='h5'>Total Users</Typography>
               <Typography variant='h5'>{data?.stats?.usersCount}</Typography>
               <LineChart value={data?.stats?.messagesChart} />
            </Paper>

            <Paper
               elevation={3}
               sx={{
                  padding: "1rem ",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: { xs: "100%", md: "50%" },
                  position: "relative",
                  maxWidth: "25rem",
               }}
            >
               <DoughnutChart labels={["Single Chats", "GroupChats"]}
                  value={[`${chats}`,`${groups}`]} />

               <Stack position={"absolute"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={"0.5rem"}
                  width={"100%"}
                  height={"100%"}
               >
                  <GroupIcon />   <Typography>vs</Typography>
                  <PersonIcon />

               </Stack>
            </Paper>
         </Stack>
         {Widgets}


      </Container>
   </AdminLayout>

}
const Widget = ({ title, value, icon }) => <Paper
   elevation={3}
   sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",


   }}


>

   <Stack alignItems={"center"} spacing={"1rem"}>

      <Typography
         sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: "5px solid rgba(0,0,0,0.9)",
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

         }}

      >{value}</Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
         {icon}
         <Typography>{title}</Typography>


      </Stack>
   </Stack>


</Paper>


export default DashBoard
