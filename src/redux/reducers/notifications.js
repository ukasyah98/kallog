const initialState = {
  data: [
    {
      title: 'Hello World',
      subtitle: 'Your Account',
    },
  ],
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
