import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'
import { CircularProgress, makeStyles } from '@material-ui/core'

import { useSelector, useDispatch } from 'react-redux';
import requestServer from './helpers/requestServer';
import Posts from './pages/Posts/Posts'
import PostForm from './pages/Posts/PostForm'
import PostEditor from './pages/PostEditor/PostEditor'

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    transition: 'opacity .3s ease, visibility .3s ease',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    marginTop: 13,
  },
}))

export default () => {
  const classes = useStyles()

  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const checkAuth = async () => {
      const [error, result] = await requestServer('/auth/check', {
        method: 'GET',
      })

      if (error) {
        return dispatch({ type: 'INIT_AUTH_CHECK_FAILED' })
      }

      dispatch({ type: 'INIT_AUTH_CHECK_SUCCESS', user: result })
    }

    // checkAuth()
  }, [dispatch])

  const NonAuthorizedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (authState.loading) return null
        return !authState.authenticated
          ? <Component {...props} />
          : <Redirect to="/" />
      }}
    />
  )

  const AuthorizedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (authState.loading) return null
        return authState.authenticated
          ? <Component {...props} />
          : <Redirect to="/sign-in" />
      }}
    />
  )
  return (
    <div>
      {true && (
        <div
          className={classes.progressWrapper}
          style={{
            opacity: authState.loading ? 1 : 0,
            visibility: authState.loading ? 'visible' : 'hidden',
          }}
        >
          <CircularProgress title="Hello" />
          <div className={classes.progressText}>
            Checking your credentials...
          </div>
        </div>
      )}
      <Switch>
        <NonAuthorizedRoute path="/sign-in" component={SignIn} />
        <AuthorizedRoute path="/posts/editor" component={PostEditor} />
        <AuthorizedRoute path="/posts/form" component={PostForm} />
        <AuthorizedRoute path="/posts" component={Posts} />
        <AuthorizedRoute path="/" component={Dashboard} />
      </Switch>
    </div>
  )
}