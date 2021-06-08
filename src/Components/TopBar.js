import React from 'react'
import { Link } from 'react-router-dom'
import '../CssStyle/TopBar.css'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function TopBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function logoutUser() {
    document.cookie = 'token='
  }

  return (
    <div>
      <ul className='horizontal'>
        <li style={{ marginRight: '20px' }}>
          <Button aria-controls='simple-menu' style={{ marginTop: '10px' }} aria-haspopup='true' onClick={handleClick}>
                Setting
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logoutUser}>
              <Link to='/login'>Login</Link>
            </MenuItem>
          </Menu>
        </li>
      </ul>

    </div>

  )
}
