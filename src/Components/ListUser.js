import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../CssStyle/ListUser.css'
import axios from "axios"
import { DataGrid } from '@material-ui/data-grid';
import API from './ConfigAxios/AxiosCommon'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function ListUser() {

  const columns = [
    { field: 'id', headerName: 'User ID', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'birthday', headerName: 'Birthday', width: 150 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
    },
    {
      field: 'textMarr',
      headerName: 'Marriage',
      width: 160
    },
    {
      field: 'Action',
      headerName: 'Action',
      align: 'center',
      headerAlign: 'center',
      width: 160,
      renderCell: (params) => {
        return <Button  
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        >Detail</Button>;
      }
    }
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function detailUser(params) {
    console.log("detail", params)
  }

    const [rows, setListUser] = useState([]);
    useEffect( () => {
      fetchData();
    });

    const fetchData = async () => {
      var res = await API.get("/api/users?page=1&size=10")
      var result = res.data.data.content
      result.forEach(e => {
        if (e.marriage) e.textMarr = "Married"
        else e.textMarr = "Single"
      })
      setListUser(res.data.data.content)
      console.log("hieu", rows)
    };
      
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1>List User</h1>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                <Button  
                    variant="contained"
                    color="default"
                    style={{marginTop: "15px"}}
                    >Export CSV
                </Button>

                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Detail User</DialogTitle>
                    <DialogContent>
                    <form  noValidate autoComplete="off">
                      <div>
                        <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
                      </div>
                      <div>
                        <TextField  id="standard-disabled" label="Disabled" defaultValue="Hello World" />
                      </div>
                      <div>
                        <TextField
                          id="standard-password-input"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                        />
                      </div>
                    </form>
                    </DialogContent>
                    <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            
        )
}
