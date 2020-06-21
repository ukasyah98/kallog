import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, IconButton } from '@material-ui/core';

// import BackspaceIcon from '@material-ui/icons/'
import BackspaceIcon from '@material-ui/icons/Backspace'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    height: '100vh',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    [theme.breakpoints.up(600)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  // paper: {
  //   marginTop: theme.spacing(3),
  //   marginBottom: theme.spacing(3),
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
  //     marginTop: theme.spacing(6),
  //     marginBottom: theme.spacing(6),
  //     padding: theme.spacing(3),
  //   },
  // },
  result: {
    flex: 1,
  },
  keyboard: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: 280,
  },
  keyboardToolbar: {
    display: 'flex',
    borderBottom: 'solid 1px lightgray',
  },
  keyboardContent: {
    flex: 1,
    overflowY: 'auto',
  },
  keyboardButton: {
    fontSize: '20px !important',
    width: '30px !important',
    height: 100,
  },
}));

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const others = '∧∨()'

export default function TruthTable() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <div className={classes.result}>
          <span>Hello</span>
        </div>
        <div className={classes.keyboard}>
          <div className={classes.keyboardToolbar}>
            {Array(others.length).fill(1).map((_, i) => (
              <Button key={`oth-${i}`} color="primary" className={classes.keyboardButton}>
                {others[i]}
              </Button>
            ))}
            {/* <Button className={classes.keyboardButton}>
              <BackspaceIcon />
            </Button> */}
            <Button className={classes.keyboardButton}>
              <span style={{ fontSize: 20 }}>=</span>
            </Button>
            {/* <Grid item xs={3}>
              <Button fullWidth>
                =
              </Button>
            </Grid> */}
          </div>
          <div className={classes.keyboardContent}>
            <Grid container>
              {Array(alphabets.length).fill(1).map((_, i) => (
                <Grid item key={`grd-${i}`} xs={3}>
                  <Button fullWidth className={classes.keyboardButton}>
                    {alphabets[i]}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        {/* <Paper className={classes.paper}>
          <div className={classes.toolbar}>
            <div className={classes.toolbarHeader}>

            </div>
            <div className={classes.toolbarContent}>

            </div>
          </div>
        </Paper>
        <Copyright /> */}
      </main>
    </React.Fragment>
  );
}