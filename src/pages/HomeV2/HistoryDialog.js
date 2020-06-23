import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {
  List, ListItem, ListItemText, Divider, Typography,
  Toolbar
} from '@material-ui/core';

export default function ({
  open, onClose,
  // isBelowXS,
  onItemClick,
}) {
  const [data, setData] = React.useState([])

  React.useLayoutEffect(() => {
    if (!open) return

    let hist = localStorage.getItem('kallogHistory')
    if (!hist) {
      localStorage.setItem('kallogHistory', '[]')
      hist = '[]'
    }
    const histo = JSON.parse(hist)
    setData(histo)
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle id="form-dialog-title">History</DialogTitle> */}
      <Toolbar style={{ minWidth: 280, minHeight: 60 }}>
        <Typography variant="h6">
          History
        </Typography>
        <div style={{ margin: 'auto' }} />
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 124px)' }}>
          {/* {!isBelowXS ? 'calc(100vh - 124px)' : 'calc(100vh - 60px)'} */}
          <List component="nav" aria-label="secondary mailbox folders">
            {data.length === 0 && (
              <ListItem>
                <ListItemText secondary="Nothing here yet" />
              </ListItem>
            )}
            {data.map((v, i) => (
              <React.Fragment key={`${i}-${v}`}>
                <Divider />
                <ListItem button onClick={() => onItemClick(v)}>
                  <ListItemText primary={`Var. sekunder: ${v[0]}`} secondary={`Var. primer: ${v[1]}`} />
                </ListItem>
                {i === 0 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </div>
      </div>
    </Dialog>
  )
}
