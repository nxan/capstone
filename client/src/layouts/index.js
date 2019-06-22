import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'

import LoginLayout from './LoginLayout'

const Layouts = {
    login: LoginLayout,
}

@withRouter
@connect(({ user }) => ({ user }))
class IndexLayout extends React.PureComponent {
    previousPath = ''

    componentDidUpdate(prevProps) {
        const { location } = this.props
        const { prevLocation } = prevProps;
        if(location != prevLocation) {
            window.scrollTo(0,0)
        }
    }

    render
}
