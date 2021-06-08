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


export default function  Welcome() {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")
    const [age, setAge] = useState("")
    const [marriage, setMarriage] = useState(false)

    function registerAction() {
       API.post("/api/user/create", {
           name: name,
           userName: username,
           password: password,
           birthday: birthday,
           age: age,
           marriage: marriage
       }).then(res => {
           console.log('dang ki thanh cong')
           setName("")
           setUsername("")
           setPassword("")
           setBirthday("")
           setAge("")
           setMarriage(false)
       }).catch(error => {
           console.log(error)
       })
    }

    return (
      <div style={{ paddingTop: '5%', display: 'flex', justifyContent: 'center' }}>
        <form noValidate autoComplete='off'
          style={{ border: '1px solid black',
            height: '500px',
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
            {/* <TextField
              required
              id='standard-password-input'
              label='Marriage'
              style={{ width: '400px' }}
              value={marriage}
              onChange={e => setMarriage(e.target.value)}
            /> */}
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
      </div>
    )
}

