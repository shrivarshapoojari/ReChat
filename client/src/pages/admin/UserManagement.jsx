import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboarddata } from '../../constants/sampleData';
import { transformImage } from '../../lib/features';
import { Avatar, Skeleton } from '@mui/material';
import { useFindAllUsersQuery } from '../../redux/reducers/api/api';
import { useErrors } from '../../hooks/hook';
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];


const UserManagement = () => {

  const {data,isLoading,error,isError}=useFindAllUsersQuery();

 
 useErrors([{isError,error}])
  const [rows,setRows]=useState([])


  useEffect(() => {
     {
      if(data){
      setRows(
        data?.users.map((i) => ({
          ...i,
          id: i._id,
          avatar:i.avatar,
        }))
        
      );
    }
    }
  },[data]);

  return  isLoading?( <Skeleton/>) : (
    <AdminLayout>
        <Table  heading={"All users"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default UserManagement
