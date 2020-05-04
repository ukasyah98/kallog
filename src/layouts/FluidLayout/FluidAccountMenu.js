import React from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MenuItem } from '@material-ui/core';

const domId = 'fam-ki39ksjio-oihj'

const items = [
  { text: 'Profile' },
  { text: 'Log Out' },
]

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-controls={domId}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id={domId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {items.map((v, i) => (
          <MenuItem key={domId + i} onClick={handleClose}>{v.text}</MenuItem>
        ))}
      </Menu>
    </div>
  )
}