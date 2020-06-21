import React from 'react'
import './LogicCalculator.css'
import { CssBaseline, IconButton, ButtonGroup, Button, Typography } from '@material-ui/core'
import { History as HistoryIcon } from '@material-ui/icons'
import HistoryDialog from './HistoryDialog'
import PerfectScrollbar from 'react-perfect-scrollbar'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ResultDialog from './ResultDialog'

const alphabets = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR', 'STU', 'VWX', 'YZ']
const operators = ['∧', '∨', '(', ')']

export default function () {
  const theme = useTheme();
  const isBelowXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [windowDim, setWindowDim] = React.useState([0, 0]) // width, height
  const [expression, setExpression] = React.useState('')
  const [submittedExp, setSubmittedExp] = React.useState('')
  const [openHistoryDialog, setOpenHistoryDialog] = React.useState(false)
  const [openResultDialog, setOpenResultDialog] = React.useState(false)

  const onHistoryDialogOpen = () => setOpenHistoryDialog(true)
  const onHistoryDialogClose = () => setOpenHistoryDialog(false)
  const onResultDialogOpen = () => setOpenResultDialog(true)
  const onResultDialogClose = () => setOpenResultDialog(false)

  const onAlphabetKeyClick = (e) => {
    const text = e.target.innerText
    const lastExpChar = expression[expression.length - 1]
    if (operators.includes(lastExpChar) || !lastExpChar) {
      setExpression(exp => exp + text)
      return
    }
    setExpression(exp => exp.substring(0, exp.length - 1) + text)
  }
  const onOperatorKeyClick = (e) => {
    // const brackets = ['(', ')']
    const logics = ['∧', '∨']
    const char = e.target.innerText
    const lastChar = expression[expression.length - 1]
    if (logics.includes(lastChar) && logics.includes(char)) {
      setExpression(exp => exp.substring(0, exp.length - 1) + char)
      return
    }
    if (logics.includes(lastChar) && char === '(') {
      setExpression(exp => exp + char)
      return
    }
    if (logics.includes(char) && lastChar === ')') {
      setExpression(exp => exp + char)
      return
    }
    if (!(operators.includes(lastChar))) {
      setExpression(exp => exp + char)
    }
    // setExpression(exp => exp + char)
    // if (!(operators.includes(lastExpChar))) {
    //   setExpression(exp => exp + text)
    // }
  }
  const onDeleteKeyClick = () => {
    if (expression.length > 0) {
      const newExp = expression.substring(0, expression.length - 1)
      setExpression(newExp)
    }
  }

  const onSubmitClick = () => {
    const maxStoredExps = 10
    const hist = localStorage.getItem('kallogHistory') || '[]'
    let histo = JSON.parse(hist)
    histo = histo.filter(v => v !== expression)
    histo.unshift(expression)
    if (histo.length > maxStoredExps) {
      histo.pop()
    }
    localStorage.setItem('kallogHistory', JSON.stringify(histo))


    onResultDialogOpen()
    setSubmittedExp(expression)
  }

  const onHistoryItemClick = exp => {
    setExpression(exp)
    onHistoryDialogClose()
  }

  React.useEffect(() => {
    const myFunc = () => {
      setTimeout(() => {
        setWindowDim([window.innerWidth, window.innerHeight])
      }, 200);
    }
    myFunc()

    window.addEventListener("orientationchange", myFunc);

    return () => {
      clearTimeout()
      window.removeEventListener("orientationchange", myFunc);
    }
  }, [])

  return (
    <div className="logicc" style={{ height: windowDim[1] }}>
      <CssBaseline />
      <div className="logicc-container">
        <div className="logicc-header">
          <div style={{ margin: 'auto' }} />
          <IconButton onClick={onHistoryDialogOpen}>
            <HistoryIcon />
          </IconButton>
        </div>
        <div className="logicc-display" style={{ maxWidth: windowDim[0] }}>
          <div>
            <Typography variant="h4" component="span" style={{ padding: '0px 12px' }}>
              {expression || <span style={{ visibility: 'hidden' }}>X</span>}
            </Typography>
          </div>
          {/* <Typography variant="h4" component="span" style={{ width: '100%' }}>
            {expression || <span style={{ visibility: 'hidden' }}>X</span>}
          </Typography> */}
        </div>
        <div className="logicc-keys">
          <ButtonGroup
            fullWidth variant="text"
            color="primary" aria-label="text primary button group"
            className="logicc-button-group"
            size="large"
          >
            {operators.map(o => (
              <Button key={`op-${o}`} onClick={onOperatorKeyClick}>{o}</Button>
            ))}
          </ButtonGroup>
          <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
            <div style={{ flex: 3, overflowY: 'auto' }}>
              <PerfectScrollbar>
                {alphabets.map((v, i) => (
                  <ButtonGroup
                    key={`alp-${i}`}
                    fullWidth variant="text" color="primary"
                    className="logicc-button-group" size="large"
                    style={{ borderTop: 0 }}
                  >
                    <Button onClick={onAlphabetKeyClick}>{v[0]}</Button>
                    <Button onClick={onAlphabetKeyClick}>{v[1]}</Button>
                    <Button onClick={onAlphabetKeyClick}
                      style={{ pointerEvents: Boolean(v[2]) ? 'auto' : 'none' }}
                    >
                      {v[2] || <span style={{ visibility: 'hidden' }}>X</span>}
                    </Button>
                  </ButtonGroup>
                ))}
              </PerfectScrollbar>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ButtonGroup
                variant="text" color="primary"
                className="logicc-button-group"
                size="large" fullWidth
                style={{ borderLeft: 0, borderTop: 0, borderBottom: 0 }}
              >
                <Button onClick={onDeleteKeyClick}>DEL</Button>
              </ButtonGroup>
              <ButtonGroup
                variant="text" color="primary"
                className="logicc-button-group"
                size="large" fullWidth
                style={{ flex: 1, borderLeft: 0 }}
              >
                <Button onClick={onSubmitClick}>=</Button>
              </ButtonGroup>
            </div>
            {/* <ButtonGroup
              variant="text"
              color="primary"
              className="logicc-button-group"
              size="large"
              orientation="vertical"
              style={{ flex: 1, borderLeft: 0 }}
            >
              <Button>DEL</Button>
              <Button>=</Button>
            </ButtonGroup> */}
          </div>
        </div>
      </div>
      <HistoryDialog
        open={openHistoryDialog}
        onClose={onHistoryDialogClose}
        isBelowXS={isBelowXS}
        onItemClick={onHistoryItemClick}
      />
      <ResultDialog
        open={openResultDialog}
        onClose={onResultDialogClose}
        isBelowXS={isBelowXS}
        expression={submittedExp}
      />
    </div>
  )
}