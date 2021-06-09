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
  const classes = useStyles()

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  function submitForm(e) {
    // Chặn các event mặc định của form
    e.preventDefault()
    API
      .post('/login', {
        username: username,
        password: password
      })
      .then((res) => {
        console.log('hieujwt', res.data.roles.toString())
        document.cookie = 'token=' + res.data.access_token
        document.cookie = 'role=' + res.data.roles.toString()
        props.history.push('/home')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        setState({ open: true, vertical: 'top', horizontal: 'center' })
      })
  }
  return (
    <div className='container' style={{ paddingTop: '5%', display: 'flex', justifyContent: 'center' }}>
      <form className={classes.root} noValidate autoComplete='off'
        style={{ border: '1px solid black',
          height: '300px',
          width: '350px',
          display: 'inline-grid',
          justifyContent: 'center',
          padding: '5px' }}>
        <div style= {{
          display: 'flex',
          justifyContent: 'center'
        }}><h2>LOGIN</h2></div>
        <div>
          <TextField id='standard-basic' label='User Name' type='text' style={{ width: '250px' }} onChange={e => setUsername(e.target.value)}
            value={username} />
        </div>
        <div>
          <TextField id='filled-basic' label='Password' type='password' style={{ width: '250px' }} onChange={e => setPassword(e.target.value)}
            value={password} />
        </div>
        <div style= {{ display: 'grid' }}>
          <Button color='primary' onClick={submitForm} >
            Login
          </Button>
          <Link style={{ cursor: 'pointer', color: 'blue' }} to='/register'>Click here for new user registration</Link>
        </div>
      </form>

      <Snackbar open={open}  autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }}>
        <Alert  severity="warning" >
          Wrong password or username!!
        </Alert>
      </Snackbar>

    </div>
  )
}
