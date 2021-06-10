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
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  else return ''
}


export default function ListUser(props) {

  const columns  = [
    { field: 'id', headerName: 'User ID', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'userName', headerName: 'User Name', width: 250 },
    { field: 'dateTime', headerName: 'Birthday', width: 250 },
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
      width: 200,
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
  const [rows, setListUser] = useState([]);
  const [selectDetail, setSelection] = useState({
    name: "",
    userName: "",
    password: "",
    birthday: "",
    dateTime: "",
    age: "",
    marriage: ""
  });
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10)
  const [countRow, setCountRow] = useState(1)
  const [loading, setLoading] = useState(false);
  const [notifyText, setNotifyText] = useState("")
  const [typeNotify, setTypeNotify] = useState("")


  const [state, setState] = useState({
    openMs: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, openMs } = state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (params) => { 
    let pageTemp = params.page
    setPage(pageTemp)
    setSize(10)
  }


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
 

    const fetchData = async () => {
      setLoading(true)
      try {
        let res = await API.get(`/api/users?page=${page}&size=${size}`)
        let result = res.data.data.content
        result.forEach(e => {
          if (e.marriage) e.textMarr = "Married"
          else e.textMarr = "Single"
          e.dateTime = formatDate(e.birthday)
        })
                setCountRow(res.data.data.totalSize)
        setListUser(result)

        setLoading(false)
      } catch(error) {
        setLoading(false)
      }
      
    };

    const deleteUser = (id) => {
      let listId = []
      listId.push(id)
      API.post("/api/users/delete", listId).then(res => {
        console.log("delete thanh cong")
        setOpen(false);
        setNotifyText("Delete success")
        setTypeNotify("success")
        setState({ openMs: true, vertical: 'top', horizontal: 'center' })
        fetchData();
      }).catch(er => {
        console.log("loi")
        setNotifyText("Delete failed")
        setTypeNotify("error")
        setState({ openMs: true, vertical: 'top', horizontal: 'center' })
      })
    }

    useEffect( () => {
      if (getCookie('token') === '') {
        props.history.push("/login")
        return
      }
      fetchData();
    },[page]);

    function setProperty(property, value) {
      switch(property) {
      case 'name':
        setSelection({...selectDetail,name: value})
        break;
      case 'username':
        setSelection({...selectDetail,userName: value})
        break;
        case 'password':
          setSelection({...selectDetail,password: value})
        break;
        case 'birthday':
          setSelection({...selectDetail,birthday:value})
          setSelection({...selectDetail,dateTime: value})
        break;
        case 'age':
          setSelection({...selectDetail,age: value})
        break;
        case 'marriage':
          setSelection({...selectDetail,marriage: value})
        break;
        default:
      }
    }

    function updateDetailUser() {
      selectDetail.birthday = selectDetail.dateTime
      API.post("/api/user/update", selectDetail).then(res =>{
        console.log("update thanh cong")
        setOpen(false);
        setNotifyText("Update success")
        setTypeNotify("success")
        setState({ openMs: true, vertical: 'top', horizontal: 'center' })
        fetchData();
      }).catch(e => {
        console.log("update that bai")
        setNotifyText("Update failed")
        setTypeNotify("error")
        setState({ openMs: true, vertical: 'top', horizontal: 'center' })
      })
    }
      
        return (
            <div style={{ height: "calc(100vh - 280px)", width: '100%' }}>
                <h2>List User</h2>
                <DataGrid 
                rows={rows} 
                columns={columns} 
                rowHeight={50} 
                rowCount={countRow}
                paginationMode="server"
                checkboxSelection
                onRowSelected={(newSelection) => {
                  setSelection(newSelection.data);
                }}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  onPageChange={handlePageChange}
                  pageSize={size}
                  loading={loading}
                  pagination
                  />
                
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Detail User</DialogTitle>
                    <DialogContent>
                      <form noValidate autoComplete='off'>
                        <div>
                          <TextField 
                          required 
                          id='standard-required' 
                          label='Name' 
                          style={{ width: '400px', marginBottom: "20px" }}
                          value={selectDetail.name}
                          onChange={e => {setProperty('name', e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField 
                          required 
                          id='standard-disabled' 
                          label='Password' 
                          type='password' 
                          style={{ width: '400px' , marginBottom: "20px" }} 
                          value={selectDetail.password}
                          onChange={e => {setProperty('password', e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='User Name'
                            style={{ width: '400px' , marginBottom: "20px" }}
                            value={selectDetail.userName}
                            disabled
                            onChange={e => {setProperty('username', e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            style={{ width: '400px', marginBottom: "20px" }}
                            type="date"
                            value={selectDetail.dateTime}
                            onChange={e => {setProperty('birthday', e.target.value)}}
                          />
                        </div>
                        <div>
                          <TextField
                            required
                            id='standard-password-input'
                            label='Age'
                            style={{ width: '400px', marginBottom: "20px" }}
                            type='number'
                            value={selectDetail.age}
                            onChange={e => {setProperty('age', e.target.value)}}
                          />
                        </div>
                        <div>
                        <FormControl component="fieldset" >
                        <FormLabel component="legend">Marriage</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={selectDetail.marriage + ''} onChange={e => {setProperty('marriage', e.target.value)}}>
                            <FormControlLabel value="true" control={<Radio />} label="Married" />
                            <FormControlLabel value="false" control={<Radio />} label="Single" />
                        </RadioGroup>
                        </FormControl>
                        </div>
                      </form>
                    </DialogContent>
                    <DialogActions>
                  <Button onClick={handleClose} color="inherit">
                    Cancel
                  </Button>
                  <Button onClick={() => {updateDetailUser()}} color="primary">
                    Update
                  </Button>
                  <Button onClick={() => {deleteUser(selectDetail.id)}} color="secondary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

            {/* message notify */}
            <Snackbar open={openMs}  autoHideDuration={3000} anchorOrigin={{ vertical, horizontal }} onClose={() => setState({openMs: false, vertical: 'top', horizontal: 'center'})}>
              <Alert  severity={typeNotify} >
                {notifyText}
              </Alert>
            </Snackbar>
            </div>
            
        )
}
