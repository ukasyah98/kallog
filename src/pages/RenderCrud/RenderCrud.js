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
import objectToParams from '../../helpers/objectToParams'

// const filter = {
//   perPage: 15,
//   page: 1,
//   keyword: 'web',
//   sort: ['votes', 'asc'],
// }

export default withSnackbar((props) => {
  const {
    title, selector,
    layout: Layout, fields,
    idFieldName = 'name',
  
    enqueueSnackbar,
  } = props

  const [openFilterDialog, setOpenFilterDialog] = React.useState(false)

  const [openFormDialog, setOpenFormDialog] = React.useState(false)
  const [fetchLoading, setFetchLoading] = React.useState(true)

  const [data, setData] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [lastPage, setLastPage] = React.useState(1)

  const [selectedData, setSelectedData] = React.useState(null)
  const [perPage, setPerPage] = React.useState(15)
  const [page, setPage] = React.useState(1)
  const [keyword, setKeyword] = React.useState('')
  const [sort, setSort] = React.useState([])

  const fetchData = React.useCallback(() => {
    const reqFunc = async () => {
      setFetchLoading(true)
      const params = objectToParams({
        page, perPage, keyword, sort,
      })
      const [error, result] = await requestServer(`/${selector}?${params}`)

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

        setTotal(result.total)
        setLastPage(result.last_page)
        setData(result.data)
      })
    }

    reqFunc()
  }, [selector, page, perPage, keyword, sort])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const onTableRowClick = (v) => {
    setSelectedData(v)
    setOpenFormDialog(true)
  }

  return (
    <div>
      <Layout {...props}>
        {/* {JSON.stringify(objectToParams({
          page, perPage, keyword, sort,
        }))} */}
        <Box position="relative">
          {/* Header */}
          <Box display="flex" alignItems="center">
            <Typography variant="h5">
              {title}
            </Typography>
            <div style={{ marginRight: 10 }} />
            <IconButton
              size="medium"
              onClick={() => {
                setSelectedData(null)
                setOpenFormDialog(true)
              }}
            >
              <Add />
            </IconButton>
            <IconButton size="medium" onClick={() => setOpenFilterDialog(true)}>
              <Badge badgeContent="" variant="dot" color="secondary">
                <FilterList />
              </Badge>
            </IconButton>
            <div style={{ margin: 'auto' }} />

            <TextField
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
              {!fetchLoading && data.map((v, i) => (
                <TableRow
                  key={`tbr-${selector}-${i}`}
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => onTableRowClick(v)}
                  selected={selectedData && selectedData[idFieldName] === v[idFieldName]}
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

          <RenderCrudPagination
            disabled={fetchLoading}
            lastPage={lastPage}
            total={total}
            page={page}
            setPage={setPage}
          />
        </Box>
      </Layout>

      <RenderCrudFormData
        selector={selector}
        title={title}
        fields={fields}
        open={openFormDialog}
        onClose={() => {
          setOpenFormDialog(false)
        }}
        enqueueSnackbar={enqueueSnackbar}
        originalData={selectedData}
        refetch={fetchData}
      />

      <RenderCrudFilter
        open={openFilterDialog}
        onClose={() => {
          setOpenFilterDialog(false)
        }}
      />
    </div>
  )
})

