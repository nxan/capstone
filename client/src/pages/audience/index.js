import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import { Tabs, Table , Select } from 'antd'
import ChartCard2 from 'components/Components/ChartCard2'
import { Helmet } from 'react-helmet'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
// import styles from './style.module.scss'

function areaData(series) {
  return {
    labels: [
      '30',
      '29',
      '28',
      '27',
      '26',
      '25',
      '24',
      '23',
      '22',
      '21',
      '20',
      '19',
      '18',
      '17',
      '16',
      '15',
      '14',
      '13',
      '12',
      '11',
      '10',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2 days ago',
      'Yesterday',
    ],
    series: [series],
  }
}

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">
//         last Week
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href=" javascript:void(0)">
//         Last Month
//       </a>
//     </Menu.Item>
//   </Menu>
// )

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const colors = {
  primary: '#01a8fe',
  def: '#acb7bf',
  success: '#46be8a',
  danger: '#fb434a',
}

const { TabPane } = Tabs

const columnsdev = [
  {
    title: 'Devices',
    dataIndex: 'device_type_name',
    key: 'device_type_name',
  },
  {
    title: 'Users',
    dataIndex: 'totalCount',
    key: 'totalCount',
    width: '12%',
  },
  {
    title: '% Users',
    dataIndex: 'percentuser',
    width: '30%',
    key: 'percentuser',
  },
]

const columnsOS = [
  {
    title: 'Operating System',
    dataIndex: 'os_name',
    key: 'os_name',
  },
  {
    title: 'Users',
    dataIndex: 'totalCount',
    key: 'totalCount',
    width: '12%',
  },
  {
    title: '% Users',
    dataIndex: 'percentuser',
    width: '30%',
    key: 'percentuser',
  },
]

const columnsbrowser = [
  {
    title: 'Browser',
    dataIndex: 'browser_name',
    key: 'browser_name',
  },
  {
    title: 'Users',
    dataIndex: 'totalCount',
    key: 'totalCount',
    width: '12%',
  },
  {
    title: '% Users',
    dataIndex: 'percentuser',
    width: '30%',
    key: 'percentuser',
  },
]

const areaOptions = {
  low: 0,
  showArea: true,
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

@connect(({ audience }) => ({ audience }))
class Audience extends React.Component {
  render() {
    const { audience } = this.props
    const pagesession = audience.session + audience.pageView
    const x = parseInt(audience.olduser, 10)
    const y = parseInt(audience.newuser, 10)
    const pie = {
      data: {
        columns: [['old users', x], ['new users', y]],
        type: 'pie',
      },
      color: {
        pattern: [colors.primary, colors.success],
      },
    }

    return (
      <Authorize roles={['admin']}>
        <Helmet title="Audience" />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="text-black">
                  <strong>Overview</strong>
                  <br />
                  <br />
                  {/* <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="javascript:void(0)">
                      Session <Icon type="down" />
                    </a>
                  </Dropdown> */}
                  <Select defaultValue="lastmonth" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="lastmonth">Last Month</Option>
                    <Option value="lastweek">Last Week</Option>
                  </Select>
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <ChartistGraph
                    className="height-300"
                    data={areaData(audience.sessionLastMonth)}
                    options={areaOptions}
                    type="Line"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <ChartCard2
              title="Users"
              amount={audience.user}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-2">
            <ChartCard2
              title="New Users"
              amount={audience.newuser}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-2">
            <ChartCard2
              title="Sessions"
              amount={audience.session}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-2">
            <ChartCard2
              title="Bounce Rate"
              amount="240"
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-2">
            <ChartCard2
              title="Pageviews"
              amount={audience.pageView}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-2">
            <ChartCard2
              title="Page/Session"
              amount={pagesession}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <ChartCard2
              title="Avg. Session Duration"
              amount={audience.avgDuration}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-3">
            <ChartCard2
              title="Number sessions per User"
              amount="240"
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [1, 1, 1, 1, 18, 20, 26],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585',
                    },
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="mb-5">
              <C3Chart data={pie.data} color={pie.color} />
            </div>
          </div>
        </div>
        <div className="row">
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
                      <TabPane tab="Devices" key="1">
                        <Table columns={columnsdev} dataSource={audience.usrdev} />
                      </TabPane>
                      <TabPane tab="Operating System" key="2">
                        <Table columns={columnsOS} dataSource={audience.usrOS} />
                      </TabPane>
                      <TabPane tab="Browser" key="3">
                        <Table columns={columnsbrowser} dataSource={audience.usrbrowser} />
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Authorize>
    )
  }
}
export default Audience
