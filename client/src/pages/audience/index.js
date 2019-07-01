import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import ChartistGraph from 'react-chartist'
import { Tabs, Table, Menu, Dropdown, Icon } from 'antd'
import ChartCard2 from 'components/Components/ChartCard2'
import { Helmet } from 'react-helmet'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
// import styles from './style.module.scss'

const areaData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [[5, 9, 7, 8, 5, 3, 5, 4]],
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
)

const colors = {
  primary: '#01a8fe',
  def: '#acb7bf',
  success: '#46be8a',
  danger: '#fb434a',
}

const { TabPane } = Tabs

const columns = [
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
    width: '12%',
  },
  {
    title: '% Users',
    dataIndex: 'percentusers',
    width: '30%',
    key: 'percentusers',
  },
]
const columns1 = [
  {
    title: 'Devices',
    dataIndex: 'devices',
    key: 'devices',
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
    width: '12%',
  },
  {
    title: '% Users',
    dataIndex: 'percentusers',
    width: '30%',
    key: 'percentusers',
  },
]

const data = [
  {
    key: 1,
    language: 'vietnamese',
    users: 60,
    percentusers: '60%',
  },
  {
    key: 2,
    language: 'english',
    users: 40,
    percentusers: '40%',
  },
]

const data2 = [
  {
    key: 1,
    devices: 'laptop',
    users: 60,
    percentusers: '60%',
  },
  {
    key: 2,
    devices: 'PC',
    users: 40,
    percentusers: '40%',
  },
]
const areaOptions = {
  low: 0,
  showArea: true,
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

const pie = {
  data: {
    columns: [['Primary', 30], ['Success', 120]],
    type: 'pie',
  },
  color: {
    pattern: [colors.primary, colors.success],
  },
}

class Audience extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Acquisition" />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="text-black">
                  <strong>Overview</strong>
                  <br />
                  <br />
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      User <Icon type="down" />
                    </a>
                  </Dropdown>
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <ChartistGraph
                    className="height-300"
                    data={areaData}
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
              title="Users"
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
              title="Users"
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
              title="Users"
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
              title="Users"
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
              title="Users"
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
        </div>
        <div className="row">
          <div className="col-md-3">
            <ChartCard2
              title="Users"
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
          <div className="col-md-3">
            <ChartCard2
              title="Users"
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
            <Tabs type="card">
              <TabPane tab="Language" key="1">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab="Devices" key="2">
                <Table columns={columns1} dataSource={data2} />
              </TabPane>
              <TabPane tab="Operating System" key="3">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab="Mobile" key="4">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab="Browser" key="5 ">
                <Table columns={columns} dataSource={data} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Authorize>
    )
  }
}
export default Audience
