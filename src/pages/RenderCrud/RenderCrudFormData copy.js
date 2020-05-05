import React from 'react'
import { Dialog, DialogTitle, DialogContent, Select, DialogActions, Button, MenuItem, FormControl, Typography, Slider, Box, TextField } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { unstable_batchedUpdates } from 'react-dom'
import requestServer from '../../helpers/requestServer'
import { formTypes, formDefaultValues } from '../../constants/form'
import RenderCrudDatePicker from './RenderCrudDatePicker';

const fields = [
  {
    name: 'title',
    label: 'Title',
    type: formTypes.INPUT,
  },
  {
    name: 'date',
    label: 'Data',
    type: formTypes.DATE,
  },
  {
    name: 'per_page',
    label: 'Per Page',
    type: formTypes.SELECT,
    options: [
      { label: '10', value: 10 },
      { label: '25', value: 25 },
      { label: '50', value: 50 },
      { label: '75', value: 75 },
    ],
    defaultValue: '10',
  },
  {
    name: 's',
    label: 'Sort By',
    type: formTypes.SELECT,
    options: [
      { label: 'Newest', value: 'ne' },
      { label: 'Most Popular', value: 'mp' },
    ],
    defaultValue: 'mp',
  },
  {
    name: 'priceRange',
    label: 'Price Range',
    type: formTypes.RANGE_SLIDER,
    defaultValue: [0, 150000],
    min: 0,
    max: 999999,
  },
]

const MyLabel = ({ children, top = 0 }) => (
  <Typography
    style={{ fontWeight: 'bold', marginTop: top, marginBottom: 3 }}
    variant="body1"
  >
    {children}
  </Typography>
)

export default ({
  // title,
  onClose,
  open, selector,
  // onSubmit,
  // fields = [],
  enqueueSnackbar,
  refetch,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialFormData = fields.reduce((acc, v) => {
    return { ...acc, [v.name]: v.defaultValue || formDefaultValues[v.type] }
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
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={onFormClose} aria-labelledby="form-dialog-title">
      <DialogTitle>
        Filter List
      </DialogTitle>
      <DialogContent>
        {/* {submitting && <ProgressIndicator top={10} />} */}

        <form
          id={`${selector}-crud-form`}
          onSubmit={onSubmit}
          style={{ opacity: submitting ? 0.5 : 1 }}
        >
          {fields.map((f, i) => {
            if (f.type === formTypes.INPUT) {
              return (
                <div key={`filter-${f.name}`}>
                  <MyLabel top={i > 0 && 15}>{f.label}</MyLabel>
                  <TextField
                    autoFocus={i === 0}
                    variant="outlined"
                    margin="dense"
                    id={f.name}
                    // helperText={formErrors[f.name]}
                    // error={Boolean(formErrors[f.name])}
                    type="text"
                    fullWidth
                    onChange={(e) => onChange(f.name, e.target.value)}
                    value={formData[f.name]}
                    // disabled={submitting}
                  />
                </div>
              )
            } else if (f.type === formTypes.SELECT) {
              return (
                <div key={`filter-${f.name}`}>
                  <MyLabel top={i > 0 && 15}>{f.label}</MyLabel>
                  <FormControl key={`filter-${f.name}`} fullWidth variant="outlined" margin="dense">
                    <Select
                      labelId={`filter-${f.name}-label`}
                      id={`filter-${f.name}`}
                      onChange={(e) => onChange(f.name, e.target.value)}
                      value={formData[f.name]}
                    >
                      {f.options.map(o => (
                        <MenuItem key={`${f.name}-${o.value}`} value={o.value}>{o.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )
            } else if (f.type === formTypes.RANGE_SLIDER) {
              return (
                <div key={`filter-${f.name}`}>
                  <MyLabel top={i > 0 && 15}>{f.label}</MyLabel>
                  <Box display="flex" >
                    <TextField
                      label="Min"
                      variant="outlined"
                      margin="dense"
                      style={{ flex: 1, marginRight: 10 }}
                      onChange={(e) => {
                        if (e.target.value)
                          onChange(f.name, [parseInt(e.target.value), formData[f.name][1]])
                      }}
                      value={formData[f.name][0]}
                    />
                    <TextField
                      label="Max"
                      variant="outlined"
                      margin="dense"
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        if (e.target.value)
                          onChange(f.name, [formData[f.name][0], parseInt(e.target.value)])
                      }}
                      value={formData[f.name][1]}
                    />
                  </Box>
                  <Slider
                    value={formData[f.name]}
                    onChange={(e, newValue) => onChange(f.name, newValue)}
                    // valueLabelDisplay="auto"
                    aria-labelledby={`filter-${f.name}`}
                    min={f.min || 0}
                    max={f.max || 100}
                  // getAriaValueText={valuetext}
                  />
                </div>
              )
            } else if (f.type === formTypes.DATE) {
              return (
                <div key={`filter-${f.name}`}>
                  <MyLabel top={i > 0 && 15}>{f.label}</MyLabel>
                  <RenderCrudDatePicker

                  />
                </div>
              )
            }
          })}
        </form>
        {/* {JSON.stringify(originalData)} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onFormClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onFormClose} color="primary">
          Reset
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