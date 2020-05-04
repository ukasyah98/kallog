import React from 'react'
import FluidLayout from '../../layouts/FluidLayout/FluidLayout'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import AddIcon from '@material-ui/icons/Add';
// import SearchIcon from '@material-ui/icons/Search';
import TagForm from './TagForm'
import TagsTable from './TagsTable';
import DeleteSnackbar from '../../components/DeleteSnackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

export default (props) => {
  // const { history } = props
  const [openForm, setOpenForm] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState({})
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false)

  const onCreateStart = () => {
    setOpenForm(true)
    setSelectedData({})
  }
  const onUpdateStart = (item) => {
    setOpenForm(true)
    setSelectedData(item)
  }
  const onDeleteStart = (item) => {
    setOpenDeleteSnackbar(true)
  }
  const onClose = () => {
    setOpenForm(false)
  }

  const onDeleteSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return
    setOpenDeleteSnackbar(false)
  }

  return (
    <FluidLayout {...props}>
      <Box marginBottom={2} display="flex" alignItems="center">
        <TagForm
          open={openForm}
          originalData={selectedData}
          onCreateStart={onCreateStart}
          onUpdateStart={onUpdateStart}
          onClose={onClose}
        />
        <div style={{ margin: 'auto' }} />
        <TextField
          // variant="outlined"
          margin="dense"
          // id="tag-name"
          // label="Name"
          type="text"
          placeholder="Search tags..."
          // fullWidth

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        // onChange={(e) => onChange('name', e.target.value)}
        // value={formData.name}
        />

        {/* <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push('/tags/editor')}
        >
          New Tag
        </Button>
        <div style={{ flex: 1 }} /> */}
        {/* <IconButton
          color="inherit"
        >
          <SearchIcon />
        </IconButton> */}
      </Box>

      <TagsTable
        onItemClick={onUpdateStart}
        onDeleteStart={onDeleteStart}
      />

      <DeleteSnackbar
        open={openDeleteSnackbar}
        onClose={onDeleteSnackbarClose}
      />
    </FluidLayout>
  )
}