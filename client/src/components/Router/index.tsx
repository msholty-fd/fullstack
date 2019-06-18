import * as React from 'react'
import { Router, Route, Switch, Redirect, Link } from './Router'
import MainLayout from '../MainLayout'
import Login from '../../screens/Login'
import Home from '../../screens/Home'
import { useUserContext } from '../../screens/Login/UserContext'

export default () => {
  const { userState, getUser } = useUserContext()

  const userId = userState.user && userState.user.id

  React.useEffect(() => {
    getUser()
  }, [userId])

  if (!userState.user && userState.loggingIn) {
    return null
  }

  return (
    <Router>
      {userState.user ? (
        <MainLayout>
          <Route
            path="/"
            render={() => (
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="*" render={() => <Redirect to="/" />} />
              </Switch>
            )}
          />
        </MainLayout>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Login} />
          <Route path="/landlord/login" component={Login} />
          <Route path="/landlord/signup" component={Login} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      )}
    </Router>
  )
}

export { Router, Route, Switch, Redirect, Link }
