import React, { useState } from 'react'
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, Router } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import SvgIcon from '@material-ui/core/SvgIcon';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function SideBar(props) {


    function getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        else return ''
      }


    return (
        <div>
        <List>
          <ListItem button 
          style={{
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "20px"}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
              <Link to="/home" style={{
            textDecoration: "none", color: "GrayText"}} >Home</Link>
          </ListItem>
          {(getCookie('role') === 'ADMIN') && 
          <ListItem button
          style={{
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "20px"}}>
            <ListItemIcon>
              <PermIdentityIcon />
            </ListItemIcon>
            <Link to="/admin" style={{
            textDecoration: "none", color: "GrayText"}}>Admin Allower</Link>
          </ListItem>
           }
          <ListItem button
          style={{
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "20px"}}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <Link to="/users" style={{
            textDecoration: "none", color: "GrayText"}}>List of Users</Link>
          </ListItem>
      </List>
        </div>
    )

}
