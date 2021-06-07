import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../CssStyle/ListUser.css'
import axios from "axios"
import { DataGrid } from '@material-ui/data-grid';
import API from './ConfigAxios/AxiosCommon'


const columns = [
  { field: 'id', headerName: 'User ID', width: 90 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'birthday', headerName: 'Birthday', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  },
  {
    field: 'marriage',
    headerName: 'Marriage',
    width: 160
  },
  {
    field: 'Action',
    headerName: 'Action',
    width: 160
  },
];


export default function ListUser() {

    const getUserAPI =
    "/api/users?page=1&size=10";

    const [rows, setListUser] = useState([]);
    useEffect( () => {
      fetchData();
    });

    const fetchData = async () => {
      var res = await API.get(getUserAPI)
      setListUser(res.data.data.content)
      console.log("hieu", rows)
    };
      
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1>List User</h1>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                <Link style={{cursor: "pointer", color: "blue"}} to="/login">Login</Link>
            </div>
            
        )
}

// export default ListUser