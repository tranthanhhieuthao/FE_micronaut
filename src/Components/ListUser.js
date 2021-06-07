import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../CssStyle/ListUser.css'
import axios from "axios"
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'id', headerName: 'User ID', width: 90 },
  { field: 'firstName', headerName: 'User Name', width: 150 },
  { field: 'lastName', headerName: 'Birthday', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  },
  {
    field: 'marriage',
    headerName: 'Marriage',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];
export default function ListUser(props) {

    const getUserAPI =
    "http://localhost:8080/api/users?page=1&size=10";
    // var {id, age, birthday,name, marriage, userName} = this.state

    const [listUser, setListUser] = useState([]);
    let rows = []
    useEffect(() => {
      axios
      .get(getUserAPI)
      .then((res) => {
        //Cập nhật giá trị của state listUser
        rows = res.data.data.content
        // setListUser(res.data.data.content);
        console.log("hieu", res.data.data)
      })
      .catch((err) => {
        //Trường hợp xảy ra lỗi
        console.log(err)
      })
    });
      
    
        return (
            <div>
                <h1>List User</h1>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                <Link style={{cursor: "pointer", color: "blue"}} to="/login">Login</Link>
            </div>
            
        )
}

// export default ListUser