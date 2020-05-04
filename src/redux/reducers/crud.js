import FluidLayout from '../../layouts/FluidLayout/FluidLayout'
import Label from '@material-ui/icons/Label'
import Home from '@material-ui/icons/Home'

const initialState = {
  data: [
    {
      selector: 'tags',
      title: 'Tags',
      icon: Label,
      layout: FluidLayout,
      fields: [
        {
          name: 'name',
          label: 'Name',
        },
        // {
        //   name: 'used',
        //   label: 'Used',
        // },
      ]
    },
    {
      selector: 'test',
      title: 'Home',
      icon: Home,
      layout: FluidLayout,
      fields: [],
    },
  ],
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
