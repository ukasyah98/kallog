import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Box, IconButton, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Badge } from '@material-ui/core'
import { Search, Add, FilterList } from '@material-ui/icons'
import requestServer from '../../helpers/requestServer';
import { unstable_batchedUpdates } from 'react-dom';
import { withSnackbar } from 'notistack';
import RenderCrudPagination from './RenderCrudPagination';
import RenderCrudProgress from './RenderCrudProgress';
import RenderCrudFormData from './RenderCrudFormData';
import RenderCrudFilter from './RenderCrudFilter';

export default withSnackbar((props) => {
  const {
    title, selector,
    layout: Layout, fields,
  
    enqueueSnackbar,
  } = props

  const [openFilterDialog, setOpenFilterDialog] = React.useState(false)

  const [openFormDialog, setOpenFormDialog] = React.useState(false)
  const [fetchLoading, setFetchLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  const fetchData = React.useCallback(() => {
    const reqFunc = async () => {
      setFetchLoading(true)
      const [error, result] = await requestServer(`/${selector}`)

      unstable_batchedUpdates(() => {
        setFetchLoading(false)
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
      })
    }

    reqFunc()
  }, [selector])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  // React.useEffect(() => {
  //   console.log(props.layout)
  // }, [props.layout])

  return (
    <div>
      {/* {JSON.stringify(props)}
      <Layout {...props} /> */}
      <Layout {...props}>
        <Box position="relative">
          {/* Header */}
          <Box display="flex" alignItems="center">
            <Typography variant="h5">
              {title}
            </Typography>
            <div style={{ marginRight: 10 }} />
            <IconButton size="medium" onClick={() => setOpenFormDialog(true)}>
              <Add />
            </IconButton>
            <IconButton size="medium" onClick={() => setOpenFilterDialog(true)}>
              <Badge badgeContent="" variant="dot" color="secondary">
                <FilterList />
              </Badge>
            </IconButton>
            <div style={{ margin: 'auto' }} />

            <TextField
              // margin="deadminnse"
              type="text"
              placeholder={`Search here`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            // onChange={(e) => {
            //   e.persist()
            //   debounceSearch(e)
            // }}
            // value={formData.name}
            />
          </Box>
          <div style={{ marginBottom: 10 }} />

          {fetchLoading && <RenderCrudProgress top={80} />}

          <Table>
            <TableHead>
              <TableRow>
                {fields.map(f => (
                  <TableCell key={`thc-${f.name}`}>{f.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((v, i) => (
                <TableRow
                  key={`tbr-${selector}-${i}`}
                  hover
                >
                  {fields.map((f, j) => (
                    <TableCell key={`tbr-${selector}-${i}-${j}`}>{v[f.name]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!fetchLoading && data.length === 0 && (
            <Typography variant="body1" align="center" style={{ marginTop: 30 }}>
              No data available
            </Typography>
          )}

          <RenderCrudPagination />
        </Box>
      </Layout>

      <RenderCrudFormData
        selector={selector}
        title={title}
        fields={fields}
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        enqueueSnackbar={enqueueSnackbar}
        refetch={fetchData}
      />

      <RenderCrudFilter
        open={openFilterDialog}
        onClose={() => setOpenFilterDialog(false)}
      />
    </div>
  )
})

