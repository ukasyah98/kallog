import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

export default function ({
  open, originalData = {},
  onCreateStart,
  onClose,
}) {
  const [formData, setFormData] = React.useState({
    name: '',
  })

  React.useEffect(() => {
    setFormData(originalData)
  }, [originalData])

  const onSubmit = e => {
    e.preventDefault()
    alert(JSON.stringify(formData))
  }

  const onChange = (name, value) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={onCreateStart} startIcon={<AddIcon />}>
        New Tag
      </Button>
      <Dialog fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>
          {originalData ? 'Edit' : 'New'} Tag
        </DialogTitle>
        <DialogContent>
          <form id="tag-form" onSubmit={onSubmit}>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="tag-name"
              label="Name"
              type="text"
              fullWidth
              onChange={(e) => onChange('name', e.target.value)}
              value={formData.name}
            />
          </form>
          {JSON.stringify(formData)}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" form="tag-form" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
