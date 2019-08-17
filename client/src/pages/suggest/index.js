import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import ShortItemInfo from 'components/Components/ShortItemInfo'

class Suggest extends React.Component {

  render() {
    const data1 = [{
      "name": "Bejewelled black diamond skull belt buckle",
      "url": "https://google.com"
    }, {
      "name": "Black and orange skull arm length fingerless gloves	",
      "url": "https://google.com"
    }, {
      "name": "Black and white striped polo shirt	",
      "url": "https://google.com"
    }, {
      "name": "Black and white checked elastic bandana	",
      "url": "https://google.com"
    }, {
      "name": "Black and white ghoul faces fingerless gloves",
      "url": "https://google.com"
    }, {
      "name": "Black and red skull fingerless gloves 1	",
      "url": "https://google.com"
    }, {
      "name": "Black and white checked zandana	",
      "url": "https://google.com"
    }, {
      "name": "Black and blue skull arm length fingerless gloves	",
      "url": "https://google.com"
    }, {
      "name": "Skull and cross belt buckle",
      "url": "https://google.com"
    }, {
      "name": "Black and orange skull fingerless gloves",
      "url": "https://google.com"
    }]
    const data2 = [{
      "name": "Black and white animal print and mesh skirt	",
      "url": "https://google.com"
    }, {
      "name": "Black and green skull arm length fingerless gloves	",
      "url": "https://google.com"
    }, {
      "name": "Black and white skull arm length fingerless gloves	",
      "url": "https://google.com"
    }, {
      "name": "Black and white jack fingerless gloves 1",
      "url": "https://google.com"
    }, {
      "name": "Black and white jack fingerless gloves",
      "url": "https://google.com"
    }, {
      "name": "Small black bag with skulls and roses",
      "url": "https://google.com"
    }, {
      "name": "Galaxy s9",
      "url": "https://google.com"
    }, {
      "name": "Black gloves with skeleton motif",
      "url": "https://google.com"
    }, {
      "name": "Black and red skull arm length fingerless gloves",
      "url": "https://google.com"
    }, {
      "name": "Animal print hair band various colours",
      "url": "https://google.com"
    }]
    const data3 = [{
      "name": "11h-12h",
    }, {
      "name": "14h-15h",
    }, {
      "name": "16h-17h",
    }, {
      "name": "07h-08h",
    }, {
      "name": "15h-16h",
    }, {
      "name": "21h-22h",
    }, {
      "name": "17h-18h",
    }, {
      "name": "10h-11h",
    }, {
      "name": "08h-09h",
    }, {
      "name": "13h-14h",
    }]
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
                {data1.map(item => {
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
          <div className="col-xl-6">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Less concerned</strong>
                </div>
              </div>
              <div className="card-body">
                {data2.map(item => {
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
        <div className="row">
          <div className="col-xl-6">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Most access period </strong>
                </div>
              </div>
              <div className="card-body">
                {data3.map(item => {
                  return (
                    <ShortItemInfo
                      key={item.name}
                      name={item.name}
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
