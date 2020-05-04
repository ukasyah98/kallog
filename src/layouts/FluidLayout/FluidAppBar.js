import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import drawerWidth from './drawerWidth'
import FluidSearchBar from './FluidSearchBar'
import FluidNotifications from './FluidNotifications'
import FluidAccountMenu from './FluidAccountMenu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 10,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

export default ({
  handleDrawerToggle,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>

        <div style={{ margin: 'auto' }} />

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <FluidSearchBar />


        <FluidNotifications />
        <FluidAccountMenu />
        {/* <Typography variant="h6" noWrap>
          Responsive drawer
      </Typography> */}
      </Toolbar>
    </AppBar>
  )
}