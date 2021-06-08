import React, { useState, useEffect } from 'react'
import '../CssStyle/ListUser.css'
import { DataGrid } from '@material-ui/data-grid';
import API from './ConfigAxios/AxiosCommon'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function ListUser(props) {

  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    else return ''
  }

  const [open, setOpen] = useState(false);
  const [rows, setListUser] = useState([]);
  const [detailValue, setDetailValue] = useState({})

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


  const handleClickOpen = (e) => {
    console.log("lklk", e)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function detailUser(params) {
    console.log("detail", params)
  }
 
    useEffect( () => {
      if (getCookie('token') === '') {
        props.history.push("/login")
        return
      }
      fetchData();
    }, []);

    const fetchData = async () => {
      let res = await API.get("/api/users?page=1&size=10")
      let result = res.data.data.content
      result.forEach(e => {
        if (e.marriage) e.textMarr = "Married"
        else e.textMarr = "Single"
      })
      setListUser(res.data.data.content)
    };
      
        return (
            <div style={{ height: "660px", width: '100%' }}>
                <h2>List User</h2>
                <DataGrid rows={rows} columns={columns} pageSize={10} paginationMode="server" rowHeight={50} />
                <Button  
                    variant="contained"
                    color="default"
                    >Export CSV
                </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Detail User</DialogTitle>
                    <DialogContent>
                      <form noValidate autoComplete='off'>
                        <div>
                          <TextField required id='standard-required' label='Name' style={{ width: '400px' }} />
                        </div>
                        <div>
                          <TextField required id='standard-disabled' label='Password' type='password' style={{ width: '400px' }} />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='User Name'
                            style={{ width: '400px' }}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='Birthday'
                            style={{ width: '400px' }}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='Age'
                            style={{ width: '400px' }}
                            type='number'
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='Marriage'
                            style={{ width: '400px' }}
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
