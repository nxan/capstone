import React from 'react'
import { Table } from 'antd'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import {
  taskTableData
} from './data.json'

const biPolarBarData = {
  labels: ['20', '15', '10', '5', '1'],
  series: [[1, 2, 1.5, 1, 1]],
}

const biPolarBarOptions = {
  high: 2,
  low: 0,
  axisX: {
    labelInterpolationFnc(value, index) {
      return index % 1 === 0 ? value : null
    },
  },
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

const taskTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript: void(0);">{text}</a>,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    render: text => <a href="javascript: void(0);">{text}</a>,
  },
]


class Realtime extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Realtime" />
        <section className="row">
          <div className="col-lg-4">
            <section className="card text-center">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Right Now</strong>
                </div>
              </div>
              <div className="card-body">
                <strong className="font-size-50">0</strong>
              </div>
              <div className="card-footer">
                <span>USERS ON SITE</span>
              </div>
            </section>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>PageViews</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <span>Per min</span>
                  <ChartistGraph
                    className="height-100"
                    data={biPolarBarData}
                    options={biPolarBarOptions}
                    type="Bar"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="row">
          <div className="col-lg-4">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              
            </section>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              
            </section>
          </div>
       
        </section>
        <section className="row">
          <div className="col-lg-4">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              
            </section>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              
            </section>
          </div>
       
        </section>
      </Authorize>
    )
  }
}
export default Realtime
