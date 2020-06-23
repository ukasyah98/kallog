import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import chunk from 'lodash/chunk'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const alphabets = 'MNPQRSTUVWXYZ'.split('')
const chunkedAlphabets = chunk(alphabets, 5)

export default function (props) {
  const classes = useStyles();

  const handleInputClick = (e) => {
    e.preventDefault()
    const txt = e.target.innerText
    props.appendExp(txt)
  }

  return (
    <div className={classes.root}>
      <ButtonGroup size="large" fullWidth color="primary">
        <Button disabled={props.disabled} onPointerDown={handleInputClick}>∧</Button>
        <Button disabled={props.disabled} onClick={handleInputClick}>∨</Button>
        <Button disabled={props.disabled} onClick={handleInputClick}>(</Button>
        <Button disabled={props.disabled} onClick={handleInputClick}>)</Button>
        <Button disabled={props.disabled} onClick={props.popExp}>DEL</Button>
        {/* <Button disabled={props.disabled} onClick={props.onSubmit} variant="contained" disableElevation>=</Button> */}
      </ButtonGroup>
      {chunkedAlphabets.map((v, i) => (
        <ButtonGroup key={`btngrp-${i}`} size="large" fullWidth color="primary">
          {v.map((w, j) => (
            <Button
              key={`btn-${i}-${j}`}
              onPointerDown={handleInputClick}
              disabled={props.disabled}
            >
              {w}
            </Button>
          ))}
        </ButtonGroup>
      ))}
    </div>
  );
}
