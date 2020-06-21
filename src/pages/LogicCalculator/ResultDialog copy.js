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

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { transpose, evaluate } from 'mathjs'

import {
  Typography, Toolbar
} from '@material-ui/core';

export default function ({
  open, onClose,
  isBelowXS,
  expression,
  // data = [],
}) {
  const varNames = expression.replace(/[^A-Z]/g, '').split('')
  const numberOfRows = 2 ** varNames.length
  // const [varNames, setvarNames] = React.useState(['A', 'B', 'C', 'D', 'E', 'F'])

  const varData = varNames.map((cn, i) => {
    const ng = varNames.length - i - 1
    const n = 2 ** ng

    let arr = []
    let x = 1
    for (let j = 1; j <= numberOfRows; j++) {
      arr.push(x)
      if (j % n === 0) {
        x = x === 1 ? 0 : 1
      }
    }
    return arr
  })

  const columnResults = [expression].map((v, i) => {
    let res = []
    for (let a = 0; a < numberOfRows; a++) {
      let exp = v
      for (let i = 0; i < varData.length; i++) {
        exp = exp.replace(varNames[i], varData[i][a])
      }
      exp = exp.replace(/⋀/gi, ' and ')
      exp = exp.replace(/⋁/gi, ' or ')

      const eva = evaluate(exp)
      res.push(eva ? 1 : 0)
    }

    return res
  })

  const numberOf1Values = columnResults[0].filter(v => v === 1).length

  return (
    <Dialog fullScreen={true} open={open} onClose={onClose}>
      <Toolbar style={{ minWidth: 280, minHeight: 60 }}>
        <Typography variant="h6">
          Result
        </Typography>
        <div style={{ margin: 'auto' }} />
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ overflowY: 'auto', maxHeight: !isBelowXS ? 'calc(100vh - 124px)' : 'calc(100vh - 60px)' }}>
          <TableContainer>
            <div style={{ padding: 5, display: 'flex', justifyContent: 'space-around' }}>
              <span><b>1 total:</b> {numberOf1Values}</span>
              <span><b>0 total:</b> {numberOfRows - numberOf1Values}</span>
            </div>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {[...varNames, expression].map((cn, i) => (
                    <TableCell key={`${i}--${cn}`} align="center">{cn}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transpose([...varData, ...columnResults]).map((row, i) => (
                  <TableRow key={`row-${i}`}>
                    {row.map((v, j) => (
                      <TableCell key={`cell-${i}-${j}`} align="center">{v}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Dialog>
  )
}
