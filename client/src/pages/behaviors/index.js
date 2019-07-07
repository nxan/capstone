import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

class Behavior extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Behavior" />
      </Authorize>
    )
  }
}

export default Behavior
