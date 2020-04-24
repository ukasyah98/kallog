const initialState = {
    user: {},
    loading: false,
    authenticated: true,
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_AUTH_CHECK_SUCCESS':
        return {
          ...state, user: action.user || {}, loading: false, authenticated: true,
        }
      case 'INIT_AUTH_CHECK_FAILED':
        // document.cookie = `access_token=;max-age=0;path=/`
        return {
          ...state, user: {}, loading: false, authenticated: false,
        }
      case 'LOGOUT':
        document.cookie = `access_token=;max-age=0;path=/`
        return {
          ...state, user: {}, loading: false, authenticated: false,
        }
      default:
        return state
    }
  }
  