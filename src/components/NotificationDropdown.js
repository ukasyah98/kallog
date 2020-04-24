import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIconDropdown from './MenuIconDropdown'
import NotificationDropdownItemList from './NotificationDropdownItemList'
import { useSelector } from 'react-redux';

export default () => {
  const notifications = useSelector(state => state.notifications)
  
  return (
    <MenuIconDropdown
      icon={NotificationsIcon}
      badge={notifications.data.length}
    >
      <NotificationDropdownItemList />
    </MenuIconDropdown>
  )
}