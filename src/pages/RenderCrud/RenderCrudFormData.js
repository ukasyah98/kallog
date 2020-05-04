import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core'
import RenderCrudProgress from './RenderCrudProgress'
import { unstable_batchedUpdates } from 'react-dom'
import requestServer from '../../helpers/requestServer'

export default ({
  title,
  onClose,
  open, selector,
  // onSubmit,
  fields = [],
  enqueueSnackbar,
  refetch,
}) => {
  const initialFormData = fields.reduce((acc, v) => {
    return { ...acc, [v.name]: '' }
  }, {})
  const [formData, setFormData] = React.useState(initialFormData)
  const [formErrors, setFormErrors] = React.useState({
    // name: 'Ooops!'
  })
  const [submitting, setSubmitting] = React.useState(false)

  const onChange = (name, value) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const onFormClose = () => {
    setFormData(initialFormData)
    setFormErrors({})
    onClose()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const [error] = await requestServer(`/${selector}`, {
      method: 'POST', data: formData,
    })

    unstable_batchedUpdates(() => {
      setSubmitting(false)
      if (error) {
        setFormErrors(error.data)
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

      onFormClose()
    })

    refetch()
  }

  return (
    <Dialog fullWidth open={open} onClose={onFormClose} aria-labelledby="form-dialog-title">
      <DialogTitle>
        {/* {originalData ? 'Edit' : 'New'} {selector} */}
        {title} - New Data
      </DialogTitle>
      <DialogContent>
        {submitting && <RenderCrudProgress top={10} />}

        <form
          id={`${selector}-crud-form`}
          onSubmit={onSubmit}
          style={{ opacity: submitting ? 0.5 : 1 }}
        >
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
                  helperText={formErrors[f.name]}
                  error={Boolean(formErrors[f.name])}
                  type="text"
                  fullWidth
                  onChange={(e) => onChange(f.name, e.target.value)}
                  value={formData[f.name]}
                  disabled={submitting}
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
        <Button onClick={onFormClose} color="primary">
          Cancel
          </Button>
        <Button
          type="submit"
          form={`${selector}-crud-form`}
          color="primary"
          disabled={submitting}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}