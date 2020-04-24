import React from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import getUniqueId from '../helpers/getUniqueId'
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';

const domId = 'mib-' + getUniqueId()

// const ForwardNavLink = React.forwardRef((props, ref) => (
//   <NavLink {...props} innerRef={ref} />
// ));

export default ({
  icon: Icon,
  badge,
  items = [],
  // renderItems = () => {},
  // children,
}) => {
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
        {badge ? (
          <Badge badgeContent={badge} color="secondary">
            <Icon />
          </Badge>
        ) : (
            <Icon />
          )}
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
      {/* <Menu
        id={domId}
        // anchorEl={anchorEl}
        keepMounted
        // open={Boolean(anchorEl)}
        open={false}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {items.map((v, i) => [renderItems(v, handleClose)])}
        {children}
      </Menu> */}
    </div>
  )
}