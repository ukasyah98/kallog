import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './DashboardTitle';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Your Posts</Title>
      <Typography component="p" variant="h4">
        1,924
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on June 3, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View posts
        </Link>
      </div>
    </React.Fragment>
  );
}