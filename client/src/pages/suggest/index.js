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
    const data4 = [{
      "name": "Black and white jack fingerless gloves 1",
      "url": "https://google.com"
    }, {
      "name": "Black and white animal print and mesh skirt	",
      "url": "https://google.com"
    }, {
      "name": "Galaxy s9",
      "url": "https://google.com"
    }, {
      "name": "Black and green skull arm length fingerless gloves	",
      "url": "https://google.com"
    }, {
      "name": "Animal print hair band various colours",
      "url": "https://google.com"
    }, {
      "name": "Black and white skull arm length fingerless gloves	",
      "url": "https://google.com"
    }, {
      "name": "Black and red skull arm length fingerless gloves",
      "url": "https://google.com"
    }, {
      "name": "Black and white jack fingerless gloves",
      "url": "https://google.com"
    }, {
      "name": "Small black bag with skulls and roses",
      "url": "https://google.com"
    }, {
      "name": "Black gloves with skeleton motif",
      "url": "https://google.com"
    }]
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Suggest" />
        <div className="row">
          <div className="col-xl-6">
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
          <div className="col-xl-6">
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
        </div>
        <div className="row">
          <div className="col-xl-6">
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
          <div className="col-xl-6">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Top bounce rate pages</strong>
                </div>
              </div>
              <div className="card-body">
                {data4.map(item => {
                  return (
                    <ShortItemInfo
                      key={item.name}
                      name={item.name}
                      url={item.url}
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
