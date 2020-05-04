import React from 'react'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LabelIcon from '@material-ui/icons/Label';

import drawerWidth from './drawerWidth'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import cruds from '../../constants/cruds';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    // flexGrow: 1,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const items = [
  {
    path: '/',
    icon: DashboardIcon,
    text: 'Dashboard',
  },
  {
    path: '/tags',
    icon: LabelIcon,
    text: 'Tags',
  },
]

export default ({
  mobileOpen, handleDrawerToggle, activePath,
  history, match,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const crudState = useSelector(state => state.crud)

  const drawer = (
    <div>
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          HKLD
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {items.map(({ path, text, icon: Icon }) => (
          <ListItem button key={text} selected={path === activePath}>
            <ListItemIcon><Icon icon="" /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <List>
        {/* {JSON.stringify(crud)} */}
        {crudState.data.map(({ selector, title, icon: Icon }) => (
          <ListItem
            button key={`crud-${selector}`}
            onClick={() => history.push(`/manage/${selector}`)}
            selected={match.url === `/manage/${selector}`}
          >
            <ListItemIcon><Icon /></ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
  )
}