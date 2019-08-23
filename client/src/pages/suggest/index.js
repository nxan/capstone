import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import ShortItemInfo from 'components/Components/ShortItemInfo'
import { connect } from 'react-redux'

@connect(({ suggest }) => ({ suggest }))
class Suggest extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'suggest/LOAD_CURRENT_ACCOUNT',
    })
  }

  render() {
    const { suggest:{mostProduct,lessProduct, hours} } = this.props
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Suggest" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Most concerned</strong>
                </div>
              </div>
              <div className="card-body">
                {mostProduct.map(item => {
                  return (
                    <ShortItemInfo
                      key={item.key}
                      name={item.page_name}
                      url={'https://'+item.page_url}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Less concerned</strong>
                </div>
              </div>
              <div className="card-body">
                {lessProduct.map(item => {
                  return (
                    <ShortItemInfo
                    key={item.key}
                    name={item.page_name}
                    url={'https://'+item.page_url}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Most access period </strong>
                </div>
              </div>
              <div className="card-body">
                {hours.map(item => {
                  return (
                    <ShortItemInfo
                      key={item.hours}
                      name={item.hours}
                    />
                  )
                })}
              </div>
            </div>
          </div>          
        </div>        
      </Authorize>
    )
  }
}

export default Suggest
