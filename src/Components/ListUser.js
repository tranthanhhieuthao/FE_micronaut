import React, { useState, useEffect } from 'react'
import '../CssStyle/ListUser.css'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import API from './ConfigAxios/AxiosCommon'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
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
  const [selectDetail, setSelection] = useState({});
  const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")
    const [age, setAge] = useState("")
    const [marriage, setMarriage] = useState(false)

  const columns = [
    { field: 'id', headerName: 'User ID', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'dateTime', headerName: 'Birthday', width: 150 },
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
    console.log("lklk", selectDetail)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function setSelection(params) {
  //   console.log("detail", params)
  // }
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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
        e.dateTime = formatDate(e.birthday)
      })
      setListUser(res.data.data.content)
    };
      
        return (
            <div style={{ height: "calc(100vh - 290px)", width: '100%' }}>
                <h2>List User</h2>
                <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={10} 
                paginationMode="server" 
                rowHeight={50} 
                checkboxSelection
                hideFooterPagination 
                onRowSelected={(newSelection) => {
                  setSelection(newSelection.data);
              }}  
                components={{
                    Toolbar: CustomToolbar,
                  }}/>
                
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Detail User</DialogTitle>
                    <DialogContent>
                      <form noValidate autoComplete='off'>
                        <div>
                          <TextField 
                          required 
                          id='standard-required' 
                          label='Name' 
                          style={{ width: '400px' }}
                          value={selectDetail.name}
                          onChange={e => { setName(e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField 
                          required 
                          id='standard-disabled' 
                          label='Password' 
                          type='password' 
                          style={{ width: '400px' }} 
                          value={selectDetail.password}
                          onChange={e => { setPassword(e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='User Name'
                            style={{ width: '400px' }}
                            value={selectDetail.userName}
                            onChange={e => { setUsername(e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            style={{ width: '400px' }}
                            type="date"
                            value={selectDetail.dateTime}
                            onChange={e => { setBirthday(e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='Age'
                            style={{ width: '400px' }}
                            type='number'
                            value={selectDetail.age}
                            onChange={e => { setAge(e.target.value)}}
                          />
                        </div>
                        <div>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Marriage</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={selectDetail.marriage + ''} onChange={e => setMarriage(e.target.value)}>
                            <FormControlLabel value="true" control={<Radio />} label="Married" />
                            <FormControlLabel value="false" control={<Radio />} label="Single" />
                        </RadioGroup>
                        </FormControl>
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
                  <Button onClick={handleClose} color="primary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            
        )
}
