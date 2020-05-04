import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SolidAppBar from './SolidAppBar';
import MenuIconDropdown from '../../components/MenuIconDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightMenuButton: {
    // marginLeft: theme.spacing(1),
  }
}));

const accountMenuItems = [
  { text: 'Profile' },
  { text: 'Settings' },
  { text: 'Log Out' },
]

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SolidAppBar
        title="Tags"
        actions={(
          <>
            <MenuIconDropdown
              className={classes.rightMenuButton}
              icon={AccountCircleIcon}
              items={accountMenuItems}
            />
          </>
        )}
      />
    </div>
  );
}
