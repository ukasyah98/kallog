import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import HistoryIcon from '@material-ui/icons/History'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    padding: '10px 20px',
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
  formWrapper: {
    flex: 1,
    padding: 26,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    background: 'white',
    borderTop: 'solid 1px #eee',
    marginBottom: 30,
    '& > :not(:last-child)': {
      marginRight: 16,
    },
  },
}))

export default function () {
  const classes = useStyles()
  const [exp, setExp] = React.useState('M∧U')
  const [varSekunder, setVarSekunder] = React.useState('OPQRSTUVWXYZ')
  const [varPrimer, setVarPrimer] = React.useState('M')
  const [isFiltering, setIsFiltering] = React.useState(false)

  // (M∨(P∨Q∨R∨S∨T∨U∨V∨W∨X∨Y∨Z))∧N
  const [openHistoryDialog, setOpenHistoryDialog] = React.useState(false)
  // A∨B∨C∨D∨E∨F∨G∨H∨I∨J∨K∨L∨M∨N∨O∨P
  const [visualizedData, setVisualizedData] = React.useState([])
  const [submitting, setSubmitting] = React.useState(false)

  const onHistoryDialogOpen = () => setOpenHistoryDialog(true)
  const onHistoryDialogClose = () => setOpenHistoryDialog(false)
  const onHistoryItemClick = exp => {
    setExp(exp)
    onHistoryDialogClose()
  }

  const appendExp = (char) => {
    setExp(exp => `${exp}${char}`)
  }
  const popExp = () => {
    setExp(exp => exp ? exp.substr(0, exp.length - 1) : '')
  }
  const handleSubmit = () => {
    setSubmitting(true)
    const item = [varSekunder, varPrimer]

    const maxStoredItems = 10
    const hist = localStorage.getItem('kallogHistory') || '[]'
    let histo = JSON.parse(hist)
    histo = histo.filter(v => v !== item)
    histo.unshift(item)
    if (histo.length > maxStoredItems) histo.pop()
    localStorage.setItem('kallogHistory', JSON.stringify(histo))

    const varNames = item.join('').split('')
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
        let formattedExp = getPersamaan()
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

  const getPersamaan = () => {
    let persamaan = ''
    if (varPrimer.length > 0) {
      persamaan += varPrimer.length === 1
        ? varPrimer
        : '(' + varPrimer.split('').join('∧') + ')'
    }
    if (varSekunder.length > 0) {
      persamaan += varPrimer ? '∨' : ''
      persamaan += varSekunder.length === 1
        ? varSekunder
        : varSekunder.split('').join('∨')
    }
    return persamaan
  }

  const resultTableList = isFiltering ? visualizedData.filter(v => v[1] === 1) : visualizedData

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
            <TextareaAutosize
              disabled value={getPersamaan()}
              className={classes.inputDisplayText} />
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
          <Paper elevation={3} className={classes.formWrapper}>
            <div className={classes.form}>
              <TextField
                fullWidth autoFocus
                margin="dense"
                variant="outlined"
                label="Variabel sekunder"
                helperText={varSekunder ? `${varSekunder.length} variabel` : 'Contoh: PQRSTUVXY'}
                onChange={(e) => setVarSekunder(e.target.value)}
                value={varSekunder}
              />
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="Variabel primer"
                helperText={varPrimer ? `${varPrimer.length} variabel` : 'Contoh: MN'}
                onChange={(e) => setVarPrimer(e.target.value)}
                value={varPrimer}
              />
            </div>
            <Typography variant="h5">
              Ketentuan:
            </Typography>
            <Typography variant="body1">
              Total variabel primer dan sekunder
              bisa 12 atau 13. Jika berjumlah 12, maka itu terdiri
              dari 10 variabel sekunder dan 2 variabel primer
              (studi kasus ijazah).
              Jika berjumlah 13, maka itu terdiri dari 12 variabel
              sekunder dan 1 variabel primer (studi kasus transkrip
              nilai).
            </Typography>
            {/* <Keypad
              disabled={submitting}
              appendExp={appendExp}
              popExp={popExp}
              onSubmit={handleSubmit}
            /> */}
          </Paper>
        </div>
        <div className={classes.section}>
          <Header
            title={resultTableList.length ? `Hasil (${resultTableList.length} baris)` : 'Hasil'}
            disabled={submitting}
            actionComponent={(
              <FormControlLabel
                control={
                  <Switch
                    checked={isFiltering}
                    onChange={() => setIsFiltering(f => !f)}
                    color="primary"
                    name="checkedB"
                  />
                }
                label={`Filter ${varPrimer[0]} = 1`}
                style={{ display: varPrimer.length === 0 && 'none' }}
              />
            )}
          />

          <div className={classes.resultTable} id="hasil-table">
            <ResultTable
              list={resultTableList}
            />
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