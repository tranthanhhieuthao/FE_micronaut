import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import API from './ConfigAxios/AxiosCommon'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';


export default function  Welcome() {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")
    const [age, setAge] = useState("")
    const [marriage, setMarriage] = useState(false)

    const [validname, setValidname] = useState(false)
    const [validusername, setValidusername] = useState(false)
    const [validpassword, setValidpassword] = useState(false)
    const [validbirthday, setValidbirthday] = useState(false)
    const [validage, setValidage] = useState(false)

    const [validnameText, setValidnameText] = useState("")
    const [validusernameText, setValidusernameText] = useState("")
    const [validpasswordText, setValidpasswordText] = useState("")
    const [validbirthdayText, setValidbirthdayText] = useState("")
    const [validageText, setValidageText] = useState("")

    const [notifyText, setNotifyText] = useState("")
    const [typeNotify, setTypeNotify] = useState("")

    const [state, setState] = useState({
      openMs: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, openMs } = state;

    function registerAction() {

      if (validname || validusername || validpassword || validbirthday || validage 
        || validnameText === '' || validusernameText === ''  || validpasswordText === ''  || validbirthdayText === '' || validageText === '') {
        setNotifyText("Please check input data again")
        setState({ openMs: true, vertical: 'top', horizontal: 'center' })
        setTypeNotify("warning")
        return
      }
       API.post("/api/user/create", {
           name: name,
           userName: username,
           password: password,
           birthday: birthday,
           age: age,
           marriage: marriage
       }).then(res => {
           setName("")
           setUsername("")
           setPassword("")
           setBirthday("")
           setAge("")
           setMarriage(false)
           setNotifyText("Create Success ")
           setTypeNotify("success")
       }).catch(error => {
           setNotifyText("Create failed ")
           setTypeNotify("error")
       })
    }

    function validateLogin(property, value) {
      if (value === '') {
      if (property === 'username') {
        setValidusername(true)
        setValidusernameText("Please input username")
      } else if (property === 'password') {
        setValidpassword(true)
        setValidpasswordText("Please input password")
      } else if (property === 'name') {
        setValidname(true)
        setValidnameText("Please input name")

      } else if (property === 'birthday') {
        setValidbirthday(true)
        setValidbirthdayText("Please input birthday")
      } else if (property === 'age') {
        setValidage(true)
        setValidageText("Please input age")
      }
    } else {
      if (property === 'username'){
        setValidusername(false)
        setValidusernameText("")
    } else if (property ===  'password' && value.length < 6) {
      setValidpassword(true)
      setValidpasswordText("Password should be than 6 character")
    } else if (property ===  'password' && value.length > 6) {
      setValidpassword(false)
      setValidpasswordText("")
    } else if (property === 'name') {
      setValidname(false)
      setValidnameText("")
    } else if (property === 'birthday') {
      setValidbirthday(false)
      setValidbirthdayText("")
    } else if (property === 'age') {
      setValidage(false)
      setValidageText("")
    }
    }
    }

    return (
      <div style={{ paddingTop: '3%', display: 'flex', justifyContent: 'center' }}>
        <form noValidate autoComplete='off'
          style={{ border: '1px solid black',
            height: '600px',
            width: '450px',
            display: 'inline-grid',
            justifyContent: 'center',
            padding: '5px' }}>
          <div style= {{
            display: 'flex',
            justifyContent: 'center'
          }}><h2>Register</h2></div>
          <div>
            <TextField 
                error={validname} helperText={validnameText}
                onBlur={e => validateLogin('name', e.target.value)}
                required 
                id='standard-required' 
                label='Name' 
                style={{ width: '400px' }}
                value={name}
                onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField 
            error={validpassword} helperText={validpasswordText}
            onBlur={e => validateLogin('password', e.target.value)}
                required 
                id='standard-disabled' 
                label='Password' 
                type='password' 
                style={{ width: '400px' }}
                value={password}
                onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <div>
            <TextField
            error={validusername} helperText={validusernameText}
            onBlur={e => validateLogin('username', e.target.value)}
              required
              id='standard-password-input'
              label='User Name'
              style={{ width: '400px' }}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField
            error={validbirthday} helperText={validbirthdayText}
            onBlur={e => validateLogin('birthday', e.target.value)}
              required
              id='standard-password-input'
              style={{ width: '400px' }}
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
            />
          </div>
          <div>
            <TextField
            error={validage} helperText={validageText}
            onBlur={e => validateLogin('age', e.target.value)}
              required
              id='standard-password-input'
              label='Age'
              style={{ width: '400px' }}
              type='number'
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <div>
            <FormControl component="fieldset">
             <FormLabel component="legend">Marriage</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={marriage} onChange={e => setMarriage(e.target.value)}>
                <FormControlLabel value="true" control={<Radio />} label="Married" />
                <FormControlLabel value="false" control={<Radio />} label="Single" />
            </RadioGroup>
            </FormControl>
          </div>
          <Button color='primary' onClick={registerAction}>
                      Confirm
          </Button>
          <Button color='primary' >
            <Link to='/login' >
                        Login
            </Link>
          </Button>
        </form>

        <Snackbar open={openMs}  autoHideDuration={3000} anchorOrigin={{ vertical, horizontal }} onClose={() => setState({openMs: false, vertical: 'top', horizontal: 'center'})}>
              <Alert  severity={typeNotify} >
                {notifyText}
              </Alert>
            </Snackbar>
      </div>
    )
}

