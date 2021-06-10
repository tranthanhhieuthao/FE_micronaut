import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import API from './ConfigAxios/AxiosCommon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch'
    }
  }
}))
export default function ClassWelcome(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errUsername, setErroUsername] = useState(false)
  const [textValid, setTextValid] = useState("")
  const [errPassword, setPasswordValid] = useState(false)
  const [textValidPass, setTextValidPass] = useState("")
  const classes = useStyles()
  const [notifyText, setNotifyText] = useState("")

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  function submitForm(e) {
    // Chặn các event mặc định của form
    e.preventDefault()
    if (errUsername || errPassword || username === '' || password === '') {
      setNotifyText("Please check input password or username")
      setState({ open: true, vertical: 'top', horizontal: 'center' })
      return
    }
    API
      .post('/login', {
        username: username,
        password: password
      })
      .then((res) => {
        document.cookie = 'token=' + res.data.access_token
        document.cookie = 'role=' + res.data.roles.toString()
        props.history.push('/home')
        window.location.reload()
      })
      .catch((err) => {
        setNotifyText("Wrong password or usename , please check again")
        setState({ open: true, vertical: 'top', horizontal: 'center' })
      })
  }

  function validateLogin(property, value) {
    if (value === '') {
    if (property === 'username') {
      setErroUsername(true)
      setTextValid("Please input username")
    } else {
      setPasswordValid(true)
      setTextValidPass("Please input password")
    }
  } else {
    if (property === 'username'){
      setErroUsername(false)
      setTextValid("")
  } else if (property ===  'password' && value.length < 6) {
      setPasswordValid(true)
      setTextValidPass("Password should be than 6 character")
  } else {
      setPasswordValid(false)
      setTextValidPass("Please input password")
    }
   }
  }
  return (
    <div className='container' style={{ paddingTop: '5%', display: 'flex', justifyContent: 'center' }}>
      <form className={classes.root} noValidate autoComplete='off'
        style={{ border: '1px solid black',
          height: '400px',
          width: '350px',
          display: 'inline-grid',
          justifyContent: 'center',
          padding: '5px' }}>
        <div style= {{
          display: 'flex',
          justifyContent: 'center'
        }}><h2>LOGIN</h2></div>
        <div>
          <TextField 
          error={errUsername} helperText={textValid} 
          id='standard-basic' 
          onBlur={e => validateLogin('username', e.target.value)}
          label='User Name' 
          type='text' 
          style={{ width: '250px' }} 
          onChange={e => setUsername(e.target.value)}
            value={username} />
        </div>
        <div>
          <TextField 
          error={errPassword} helperText={textValidPass} 
          onBlur={e => validateLogin('password', e.target.value)}
          id='filled-basic' 
          label='Password' 
          type='password' 
          style={{ width: '250px' }} 
          onChange={e => setPassword(e.target.value)}
            value={password} />
        </div>
        <div style= {{ display: 'grid' }}>
          <Button color='primary' onClick={submitForm} >
            Login
          </Button>
          <Link style={{ cursor: 'pointer', color: 'blue' }} to='/register'>Click here for new user registration</Link>
        </div>
      </form>

      <Snackbar open={open}  autoHideDuration={3000} anchorOrigin={{ vertical, horizontal }} onClose={() => setState({open: false, vertical: 'top', horizontal: 'center'})}>
        <Alert  severity="warning" >
          {notifyText}
        </Alert>
      </Snackbar>

    </div>
  )
}
