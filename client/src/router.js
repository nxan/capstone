import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  {
    path: '/user/forgot',
    component: loadable(() => import('pages/user/forgot')),
    exact: true,
  },
  {
    path: '/user/register',
    component: loadable(() => import('pages/user/register')),
    exact: true,
  },

  // Dashboards
  {
    path: '/dashboard',
    component: loadable(() => import('pages/dashboard')),
  },
  // Menu
  {
    path: '/realtime',
    component: loadable(() => import('pages/realtime')),
    exact: true,
  },
  {
    path: '/audience',
    component: loadable(() => import('pages/audience')),
    exact: true,
  },
  {
    path: '/acquisition',
    component: loadable(() => import('pages/acquisition')),
    exact: true,
  },
  {
    path: '/behaviors',
    component: loadable(() => import('pages/behaviors')),
    exact: true,
  },
  // AntDesign
  {
    path: '/antd',
    component: loadable(() => import('pages/antd')),
    exact: true,
  },
]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
