import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { ConnectedRouter } from 'connected-react-router'
import IndexLayout from 'layouts'
import Loader from 'components/LayoutComponents/Loader'
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
  {
    path: '/profile',
    component: loadable(() => import('pages/profile')),
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
    path: '/behavior',
    component: loadable(() => import('pages/behavior')),
    exact: true,
  },
  {
    path: '/recording',
    component: loadable(() => import('pages/recording')),
    exact: true,
  },
  {
    path: '/recording/replay',
    component: loadable(() => import('pages/recording/replay')),
    exact: true,
  },
  {
    path: '/heatmap',
    component: loadable(() => import('pages/heatmap')),
    exact: true,
  },

  {
    path: '/heatmap/shop',
    component: loadable(() => import('pages/heatmap/shop')),
    exact: true,
  },

  {
    path: '/suggest',
    component: loadable(() => import('pages/suggest')),
    exact: true,
  },

  {
    path: '/settings',
    component: loadable(() => import('pages/settings')),
    exact: true,
  },
]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

export default Router
