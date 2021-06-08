import React, { useState } from 'react'
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

export default function SideBar(props) {

    function getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        else return ''
      }


    return (
        <div>
          <MenuList>
          <MenuItem>
           <Link to="/home">Home</Link>
          </MenuItem>
          {(getCookie('role') === 'ADMIN') && 
          <MenuItem >
          <Link to="/admin">Admin Allower</Link>
        </MenuItem>
          }
        <MenuItem>
             <Link to="/users">List of Users</Link>
        </MenuItem>
        </MenuList>
        </div>
    )

}
