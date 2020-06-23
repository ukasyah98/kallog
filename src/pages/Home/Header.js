import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  header: {
    height: 60,
    padding: '0px 20px',
  },
}))

export default function (props) {
  const classes = useStyles()

  return (
    <Toolbar className={classes.header}>
      <Typography variant="h6">
        {props.title}
      </Typography>
      <div style={{ margin: 'auto' }} />
      {(props.iconActions || []).map(({ icon, ...rest }, i) => (
        <IconButton
          key={`ibtn-${i}`} edge="end"
          disabled={props.disabled}
          color="inherit" {...rest}
        >
          {icon}
        </IconButton>
      ))}
    </Toolbar>
  )
}