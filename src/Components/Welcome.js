import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class Welcome extends React.Component {
  render() {
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
            <TextField required id='standard-required' label='User ID' style={{ width: '400px' }} />
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
          <Button color='primary' >
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
}

export default Welcome
