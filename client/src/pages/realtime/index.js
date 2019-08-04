import React from 'react'
import io from 'socket.io-client';
import { Table, Tabs } from 'antd'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
// import ChartistGraph from 'react-chartist'
// import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import * as am4core from '@amcharts/amcharts4/core'
// eslint-disable-next-line camelcase
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

const socket = io.connect('http://localhost:8888');
// const biPolarBarData = {
//   labels: ['20', '15', '10', '5', '1'],
//   series: [[1, 2, 1.5, 1, 1]],
// }

// const biPolarBarOptions = {
//   high: 2,
//   low: 0,
//   axisX: {
//     labelInterpolationFnc(value, index) {
//       return index % 1 === 0 ? value : null
//     },
//   },
//   plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
// }

const taskTableColumns = [
  {
    title: 'Active Page',
    dataIndex: 'name',
    render: text => <a href="javascript: void(0);">{text}</a>,
  },
  {
    title: 'Active Users',
    dataIndex: 'count',
    render: text => <a href="javascript: void(0);">{text}</a>,
  },
]

const { TabPane } = Tabs

const columnsOs = [
  {
    title: 'Operating System',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    width: '12%',
  },
]
const columnsDevice = [
  {
    title: 'Devices',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    width: '12%',
  },
]
const columnsAcquistion = [
  {
    title: 'acquistion',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    width: '12%',
  },
]
const columnsBrowser = [
  {
    title: 'Browser',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    width: '12%',
  },
]


class Realtime extends React.Component {

  constructor() {
    super();
    this.state = {
      response: 0,
      page: [],
      os: [],
      device: [],
      browser: [],
      ac: [],
      // locations: []
    };
  }

  componentDidMount() {
    socket.on('Server-send-data');
    socket.on('online', data => {
      this.setState({ response: data });
    });

    socket.on('online_os', data => {
      this.setState({ os: data })
    });
    socket.on('online_dv', data => {
      this.setState({ device: data })
    });
    socket.on('online_bw', data => {
      this.setState({ browser: data })
    });
    socket.on('online_ac', data => {
      this.setState({ ac: data })
    });
    socket.on('online_page', data => {
      console.log(data);
      this.setState({ page: data })
    });

   
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
    socket.off('online');
  }

  render() {
    const { response, page, os, device, browser, ac } = this.state;
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Realtime" />
        <section className="row">
          <div className="col-lg-12">
            <section className="card text-center">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Right Now</strong>
                </div>
              </div>
              <div className="card-body">
                <strong className="font-size-50">{response}</strong>
              </div>
              <div className="card-footer">
                <span>USERS ON SITE</span>
              </div>
            </section>
          </div>

        </section>
        <section className="row">
          <div className="col-lg-12">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>User Table Page</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={page}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-12">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Users Data Table</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Tabs type="card">
                      <TabPane tab="Devices" key="2">
                        <Table columns={columnsDevice} dataSource={device} />
                      </TabPane>
                      <TabPane tab="Operating System" key="3">
                        <Table columns={columnsOs} dataSource={os} />
                      </TabPane>
                      <TabPane tab="Acquition" key="4">
                        <Table columns={columnsAcquistion} dataSource={ac} />
                      </TabPane>
                      <TabPane tab="Browser" key="5 ">
                        <Table columns={columnsBrowser} dataSource={browser} />
                      </TabPane>
                    </Tabs>

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
export default Realtime;
