import { Divider, List,ListItem,Avatar,ListItemAvatar,ListItemText } from '@mui/material'
import React from 'react'
import {grey } from '@mui/material/colors';
function SearchUser({user}) {
  return (
        <ListItem sx={{padding:"3px 5px",marginBottom:"12px",backgroundColor:grey[200],borderRadius:"5px",cursor:"pointer"}}>
            <ListItemAvatar>
                <Avatar src={user.pic}/> 
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
  )
}

export default SearchUser