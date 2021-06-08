import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import API from './ConfigAxios/AxiosCommon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

  // function validationForm() {
  //   let returnData = {
  //     error: false,
  //     msg: ''
  //   }
  //   // Kiểm tra username
  //   // const re = /\S+@\S+\.\S+/;
  //   // if (!re.test(username)) {
  //   //   returnData = {
  //   //     error: true,
  //   //     msg: 'Không đúng định dạng email'
  //   //   }
  //   // }
  //   // Kiểm tra password
  //   if (password.length < 8) {
  //     returnData = {
  //       error: true,
  //       msg: 'Mật khẩu phải lớn hơn 8 ký tự'
  //     }
  //   }
  //   return returnData
  // }

  function submitForm(e) {
    // Chặn các event mặc định của form
    e.preventDefault()
    // Gọi hàm validationForm() dùng để kiểm tra form
    // const validation = this.validationForm()
    // Kiểm tra lỗi của input trong form và hiển thị
    // if (validation.error) {
    //   alert(validation.msg)
    // }else{
    //   alert('Submit form success')
    // }
    API
      .post('/login', {
        username: username,
        password: password
      })
      .then((res) => {
        // setListUser(res.data.data.content);
        console.log('hieujwt', res.data.roles.toString())
        document.cookie = 'token=' + res.data.access_token
        document.cookie = 'role=' + res.data.roles.toString()
        props.history.push('/home')
      })
      .catch((err) => {
        console.log(err)
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

    </div>
  )
}
