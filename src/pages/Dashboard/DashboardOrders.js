import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './DashboardTitle';

// Generate Order Data
function createData(id, date, name, contents, post, amount) {
  return { id, date, name, contents, post, amount };
}

const rows = [
  createData('#9384', '50 minutes ago', 'Elvis Presley', 'Hi', 'How to Train Your Cat', '#3404'),
  createData('#9383', '2 hours ago', 'Paul McCartney', 'Your song is pretty good', 'How to Train Your Cat', null),
  createData('#9382', 'Yesterday', 'Tom Scholz', 'I hope so', 'We\'re Going to Mecca', '#94'),
  createData('#9381', 'Yesterday', 'Michael Jackson', 'Gary, IN', 'APEX: Definition and Usage', '#5069'),
  createData('#9380', '4 years ago', 'Bruce Springsteen', 'Long Branch, NJ', 'Bring Your Sego to The Next Level', '#103'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Comments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contents</TableCell>
            <TableCell>Post</TableCell>
            <TableCell>Reply To</TableCell>
            {/* 
            <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link color="primary" href="#" onClick={preventDefault}>
                  {row.id}
                </Link>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Link color="primary" href="#" onClick={preventDefault}>
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row.contents}</TableCell>
              <TableCell>
                <Link color="primary" href="#" onClick={preventDefault}>
                  {row.post}
                </Link>
              </TableCell>
              <TableCell>
                {row.amount ? (
                  <Link color="primary" href="#" onClick={preventDefault}>
                    {row.amount}
                  </Link>
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more comments
        </Link>
      </div>
    </React.Fragment>
  );
}