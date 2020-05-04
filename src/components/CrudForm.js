import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import requestServer from '../helpers/requestServer';
import { unstable_batchedUpdates } from 'react-dom';

export default function ({
  path,
  selector,
  fields = [],
  open,
  formData,
  originalData,
  onCreateStart,
  onClose,
  onChange,

  enqueueSnackbar,
  refetch,
}) {
  // const initialFormData = fields.reduce((acc, v) => {
  //   return { ...acc, [v.name]: '' }
  // }, {})

  // const [formData, setFormData] = React.useState(initialFormData)

  // React.useEffect(() => {
  //   setFormData(originalData || initialFormData)
  // }, [originalData, initialFormData])

  const onSubmit = async (e) => {
    e.preventDefault()

    const sleep = (timeout = 1000) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, timeout);
      })
    }
    await sleep()



    return

    const [error] = await requestServer(path, {
      method: 'POST',
      data: formData,
    })

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

    unstable_batchedUpdates(() => {
      onClose()
      refetch()
    })
    // alert(JSON.stringify(formData))
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={onCreateStart} startIcon={<AddIcon />}>
        New {selector}
      </Button>
      <Dialog fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>
          {originalData ? 'Edit' : 'New'} {selector}
        </DialogTitle>
        <DialogContent>
          <form id={`${selector}-crud-form`} onSubmit={onSubmit}>
            {/* {JSON.stringify(formData)} */}
            {fields.map((f, i) => {
              if (!f.type || f.type === 'text') {
                return (
                  <TextField
                    key={f.name}
                    autoFocus={i === 0}
                    variant="outlined"
                    margin="dense"
                    id={f.name}
                    label={f.label}
                    helperText="Required"
                    type="text"
                    fullWidth
                    onChange={(e) => onChange(f.name, e.target.value)}
                    value={formData[f.name]}
                  />
                )
              } else {
                return <div />
              }
            })}
          </form>
          {/* {JSON.stringify(originalData)} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" form={`${selector}-crud-form`} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
