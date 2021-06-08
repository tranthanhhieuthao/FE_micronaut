import React, { useState, useEffect } from 'react'
import API from './ConfigAxios/AxiosCommon'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

export default function AdminScreen(props) {

  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    else return ''
  }
  
   const [status, setStatus] = useState("")
   const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

   useEffect (() => {
     if (getCookie('token') === '') {
       props.history.push("/login")
       return
     }
    API.get("/api/admin").then(res=>{ 
      console.log('admoin', res)
      if (res.data.message === "UNAUTHORIZED") {
      setStatus("Bạn có quyền truy cập dữ liệu")
      } else {
        setStatus("Bạn không được phép truy cập dữ liệu")
        setState({ open: true, vertical: 'top', horizontal: 'center' })
        props.history.push("/home")
      }
    })
    .catch(() => {
      setStatus("Bạn không được phép truy cập dữ liệu")
      setState({ open: true, vertical: 'top', horizontal: 'center' })
      props.history.push("/home")
    })
   })

    return (
      <div>
        <h1>
        {status}
        <Snackbar open={open}  autoHideDuration={600} anchorOrigin={{ vertical, horizontal }}>
        <Alert  severity="warning" >
          This is a success message!
        </Alert>
      </Snackbar>
        </h1>
      </div>
    )
}

