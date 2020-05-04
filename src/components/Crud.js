import React from 'react'
import debounce from 'lodash/debounce'
import { Box, TextField, InputAdornment, CircularProgress, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import CrudForm from './CrudForm'
import requestServer from '../helpers/requestServer';
import { withSnackbar } from 'notistack';

// export default ({ 
const Crud = ({
  selector = 'sample',
  path = '/',
  dataLength = 0,
  setData,
  RenderData,
  fields = [],
  // children,

  enqueueSnackbar,
}) => {
  const [loading, setLoading] = React.useState(true)
  // const [errorMessage, setErrorMessage] = React.useState('')

  const [openForm, setOpenForm] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState(null)
  const [query, setQuery] = React.useState('')

  const initialFormData = fields.reduce((acc, v) => {
    return { ...acc, [v.name]: '' }
  }, {})
  const [formData, setFormData] = React.useState(initialFormData)

  // const [snackbar, setSnackbar] = React.useState({
  //   open: false, message: '', action: null,
  // })
  // const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false)

  const onChange = (name, value) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const onCreateStart = () => {
    setOpenForm(true)
    setSelectedData(null)
  }
  const onUpdateStart = (item) => {
    setOpenForm(true)
    setSelectedData(item)
  }
  const onDeleteStart = (item) => {
    // setOpenDeleteSnackbar(true)
  }
  const onClose = () => {
    setFormData(initialFormData)
    setOpenForm(false)
  }

  // const onDeleteSnackbarClose = (event, reason) => {
  //   if (reason === 'clickaway') return
  //   setOpenDeleteSnackbar(false)
  // }

  // const onSnackbarClose = (event, reason) => {
  //   if (reason === 'clickaway') return
  //   setSnackbar({ ...snackbar, open: false })
  // }

  const fetchDataCallback = React.useCallback(() => {
    const fetchData = async () => {
      setLoading(true)
      const [error, result] = await requestServer(path + '?q=' + query)

      setLoading(false)
      if (error) {
        enqueueSnackbar(error.message || 'Something went wrong', {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
        return
      }
      setData(result.data)
    }

    fetchData()
  }, [enqueueSnackbar, path, setData, query])

  React.useEffect(() => {
    fetchDataCallback()
  }, [fetchDataCallback])

  const debounceSearch = debounce(e => {
    setQuery(e.target.value)
  }, 200)

  return (
    <div style={{ position: 'relative' }}>
      <Box marginBottom={2} display="flex" alignItems="center">
        <CrudForm
          path={path}
          selector={selector}
          fields={fields}
          open={openForm}
          originalData={selectedData}
          onCreateStart={onCreateStart}
          onUpdateStart={onUpdateStart}
          onClose={onClose}

          formData={formData}
          onChange={onChange}

          // enqueueSnackbar={enqueueSnackbar}
          refetch={fetchDataCallback}
        />
        <div style={{ margin: 'auto' }} />
        <TextField
          margin="dense"
          type="text"
          placeholder={`Search here`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            e.persist()
            debounceSearch(e)
          }}
        // value={formData.name}
        />
      </Box>
      {/* DATA LIST */}
      <div
        style={{
          position: 'absolute',
          marginTop: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'opacity .3s ease, visibility .3s ease',
          opacity: loading ? 1 : 0,
          visibility: loading ? 'visible' : 'hidden',
        }}
      >
        <CircularProgress />
      </div>

      <div
        style={{

          transition: 'opacity .3s ease, visibility .3s ease',
          opacity: !loading ? 1 : 0,

          // visibility: !loading ? 'visible' : 'hidden',
        }}
      >
        {!loading && dataLength === 0 && (
          <Typography variant="subtitle1" align="center" style={{ marginTop: 55 }}>
            No data available
          </Typography>
        )}
        <RenderData
          onUpdateStart={onUpdateStart}
          onDeleteStart={onDeleteStart}
        />
      </div>

    </div>
  )
}

export default withSnackbar(Crud)