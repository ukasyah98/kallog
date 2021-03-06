import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import HistoryIcon from '@material-ui/icons/History'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// import { Column, Table } from 'react-virtualized';
import { evaluate } from 'mathjs'
import ResultTable from './ResultTable'

import Header from './Header'
import Keypad from './Keypad'
import HistoryDialog from './HistoryDialog'

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  progress: {
    width: 80,
    height: 80,
    // padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'stretch',
    background: theme.palette.grey[200],
  },
  section: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflow: 'hidden',
    '&:not(:last-child)': {
      borderRight: 'solid 1px #aaa',
    },
  },
  inputDisplay: {
    padding: '0px 20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  inputDisplayText: {
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: 36,
    fontWeight: 'bold',
    width: '100%',
  },
  resultTable: {
    flex: 1,
  },
  runButton: {
    color: theme.palette.success.main,
  },
}))

export default function () {
  const classes = useStyles()
  const [exp, setExp] = React.useState('M∧U')
  // (M∨(P∨Q∨R∨S∨T∨U∨V∨W∨X∨Y∨Z))∧N
  const [openHistoryDialog, setOpenHistoryDialog] = React.useState(false)
  // A∨B∨C∨D∨E∨F∨G∨H∨I∨J∨K∨L∨M∨N∨O∨P
  const [visualizedData, setVisualizedData] = React.useState([])
  const [submitting, setSubmitting] = React.useState(false)

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     // setTimeout(() => {
  //     // const el = document.getElementById('hasil-table')

  //     // const dim = el.getBoundingClientRect()
  //     // setResultShape([dim.width, dim.height])
  //     // }, 300)
  //   }
  //   handleResize()

  //   window.addEventListener('resize', handleResize)
  //   return () => {
  //     clearTimeout()
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  const onHistoryDialogOpen = () => setOpenHistoryDialog(true)
  const onHistoryDialogClose = () => setOpenHistoryDialog(false)
  const onHistoryItemClick = exp => {
    setExp(exp)
    onHistoryDialogClose()
  }

  // const handleInputChange = (e) => {
  //   setExp(e.target.value)
  // }
  // React.useLayoutEffect(() => {
  //   setTimeout(() => {
  //     if (!inputRef.current) return
  //     inputRef.current.focus()
  //     inputRef.current.selectionStart = exp.length;
  //     inputRef.current.selectionEnd = exp.length;
  //   }, 500);

  //   // return () => {
  //   //   clearTimeout()
  //   // }
  // }, [exp])

  const appendExp = (char) => {
    setExp(exp => `${exp}${char}`)
    // inputRef.current.focus()
    // inputRef.current.selectionStart = inputRef.current.value.length - 3;
    // inputRef.current.selectionEnd = inputRef.current.value.length;
  }
  const popExp = () => {
    setExp(exp => exp ? exp.substr(0, exp.length - 1) : '')
    // inputRef.current.focus()
    // inputRef.current.selectionStart = inputRef.current.value.length - 3;
    // inputRef.current.selectionEnd = inputRef.current.value.length;
  }
  const handleSubmit = () => {
    setSubmitting(true)

    const maxStoredExps = 10
    const hist = localStorage.getItem('kallogHistory') || '[]'
    let histo = JSON.parse(hist)
    histo = histo.filter(v => v !== exp)
    histo.unshift(exp)
    if (histo.length > maxStoredExps) histo.pop()
    localStorage.setItem('kallogHistory', JSON.stringify(histo))

    const varNames = exp.replace(/[^A-Z]/g, '').split('').sort()
    const numberOfRows = 2 ** varNames.length

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


    let visData = []
    try {
      visData.push(['No.', ...varNames, 'Nilai'])
      for (let a = 0; a < numberOfRows; a++) {
        let formattedExp = exp
        let visDataItem = []
        visDataItem.push(a + 1)
        for (let i = 0; i < varData.length; i++) {
          // visDataItem[varNames[i]] = varData[i][a]
          visDataItem.push(varData[i][a])
          formattedExp = formattedExp.replace(varNames[i], varData[i][a])
        }

        formattedExp = formattedExp.replace(/∧/gi, ' and ')
        formattedExp = formattedExp.replace(/∨/gi, ' or ')

        const eva = evaluate(formattedExp)
        // res.push(eva ? 1 : 0)
        visDataItem.push(eva ? 1 : 0)
        visData.push(visDataItem)
      }
    }
    catch (err) {
      alert('Syntax Error!')
      setSubmitting(false)
      return
      // document.getElementById("demo").innerHTML = err.message;
    }
    setTimeout(() => {
      // alert(JSON.stringify(visData[0][0]))
      setVisualizedData(visData)
      setSubmitting(false)
    }, 1000);
    // alert(JSON.stringify(visData))
  }

  return (
    <div>
      <CssBaseline />
      {submitting && (
        <div className={classes.progressWrapper}>
          <Paper elevation={2} className={classes.progress}>
            <CircularProgress />
          </Paper>
        </div>
      )}
      <div className={classes.root}>
        <div className={classes.section}>
          <Header
            title="max1213TAUTO"
            disabled={submitting}
            iconActions={[
              { title: 'History', icon: <HistoryIcon />, onClick: onHistoryDialogOpen },
              { title: 'Run', icon: <PlayArrowIcon />, className: classes.runButton, onClick: handleSubmit },
            ]}
          />
          <div className={classes.inputDisplay}>
            <TextareaAutosize disabled value={exp} className={classes.inputDisplayText} />
            {/* <InputBase
                fullWidth autoFocus
                onChange={handleInputChange}
                value={exp}
                inputRef={inputRef}
                className={classes.inputDisplayText}
              /> */}
            {/* <Typography variant="h3">
                {<span>{exp}</span> || <span style={{ visibility: 'hidden' }}>X</span>}
              </Typography> */}
          </div>
          <div className={classes.none}>
            <Keypad
              disabled={submitting}
              appendExp={appendExp}
              popExp={popExp}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className={classes.section}>
          <Header title="Hasil" disabled={submitting} />

          <div className={classes.resultTable} id="hasil-table">
            <ResultTable list={visualizedData} />
            {/* <Table
              width={resultShape[0]}
              height={resultShape[1]}
              headerHeight={20}
              rowHeight={30}
              rowCount={visualizedData.length}
              rowGetter={({ index }) => visualizedData[index]}
            >
              <Column label="No." dataKey="No." width={30} />
              {variableNames.map(v => (
                <Column key={`res-clm-${v}`} label={v} dataKey={v} width={30} />
              ))}
              <Column label={exp} dataKey={exp} width={100} />
            </Table> */}
          </div>

        </div>
      </div>

      <HistoryDialog
        open={openHistoryDialog}
        onClose={onHistoryDialogClose}
        onItemClick={onHistoryItemClick}
      />
    </div>
  )
}