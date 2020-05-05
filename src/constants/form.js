export const formTypes = {
  INPUT: 'INPUT',
  DATE: 'DATE',
  SELECT: 'SELECT',
  RANGE_SLIDER: 'RANGE_SLIDER',
}

export const formDefaultValues = {
  INPUT: '',
  DATE: null,
  SELECT: '',
  RANGE_SLIDER: [0, 0],
}

// const formTypes = Object.keys(defaultValues).reduce((acc, v) => ({
//   ...acc, [v]: v
// }), {})
