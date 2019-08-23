import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import ChartistGraph from 'react-chartist'
import { connect } from 'react-redux'
import { Tabs, Table, Progress, DatePicker } from 'antd'
import ChartCard2 from 'components/Components/ChartCard2'
import { Helmet } from 'react-helmet'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
import moment from 'moment'
import ReactLoading from 'react-loading';
// import styles from './style.module.scss'


function areaData2(series) {
  return {
    labels: ['7', '6', '5', '4', '3', '2 days ago', 'Yesterday'],
    series: [series],
  }
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
    render: percentuser => (
      <div style={{ width: 170 }}>
        <Progress percent={percentuser} size="small" status="active" />
      </div>
    ),
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
    render: percentuser => (
      <div style={{ width: 170 }}>
        <Progress percent={percentuser} size="small" status="active" />
      </div>
    ),
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
    render: percentuser => (
      <div style={{ width: 170 }}>
        <Progress percent={percentuser} size="small" status="active" />
      </div>
    ),
  },
]

const columnsLocation = [
  {
    title: 'Country',
    dataIndex: 'location',
    key: 'country_name',
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'totalUsers',
    width: '12%',
  },
  {
    title: '% Users',
    dataIndex: 'percentuser',
    width: '30%',
    key: 'percentuser',
    render: percentuser => (
      <div style={{ width: 170 }}>
        <Progress percent={percentuser} size="small" status="active" />
      </div>
    ),
  },
]
const data = [
  {
    location: 'Vietnam',
    users: '23',
    percentuser: '100',
    key: 'VN',
    children: [
      {
        location: 'HCM',
        users: '23',
        percentuser: '100',
        key: 'HCM'
      },
    ]
  },
]
const areaOptions = {
  low: 0,
  showArea: true,
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

@connect(({ audience }) => ({ audience }))
class Audience extends React.Component {
  state = {
    // result: this.props,
    startValue: null,
    endValue: null,
    endOpen: false,
    // loading: true
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'audience/LOAD_AUDIENCE',
    })
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = endValue => {
    const { startValue } = this.state
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChange = value => {
    this.onChange('startValue', value)
  }

  onEndChange = value => {
    this.onChange('endValue', value)
    const { startValue } = this.state;

    /* eslint no-underscore-dangle: "error" */
    /* eslint no-underscore-dangle: ["error", { "allow": ["_d"] }] */
    const startTime = moment(startValue, 'YYYY-MM-DD').format('YYYY-MM-DD')

    /* eslint no-underscore-dangle: "error" */
    /* eslint no-underscore-dangle: ["error", { "allow": ["_d"] }] */
    const endTime = moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const values = { startTime, endTime }
    // console.log(values)
    // this.setState({ loading: true })
    const { dispatch } = this.props
    dispatch({
      type: 'audience/LOAD_AUDIENCE_DATE',
      payload: values
    })

  }

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = open => {
    this.setState({ endOpen: open })
  }



  render() {
    const { startValue, endValue, endOpen } = this.state
    const { audience } = this.props
    console.log("AUDIENCE")
    /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */
    // const audience = result.audience
    // console.log(result)
    // console.log(audience)
    const pagesession = audience.session + audience.pageView
    const numberSessionUser = Math.round(audience.session / audience.user, 2)
    const x = parseInt(audience.olduser, 10)
    const y = parseInt(audience.newuser, 10)
    const bounceRate = audience.bounceRate
    const pie = {
      data: {
        columns: [['OLD USERS', x], ['NEW USERS', y]],
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

          <div className="col-lg-8" />
          <div className="col-lg-4 text-right">
            <DatePicker
              disabledDate={this.disabledStartDate}
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
            <DatePicker
              disabledDate={this.disabledEndDate}
              format="YYYY-MM-DD"
              value={endValue}
              placeholder="End"
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <ReactLoading type="balls" color="#FFA07A" height='20%' width='20%' />
              <div className="card-header">
                <h5 className="text-black">
                  <strong>OVERVIEW SESSION BY TIME</strong>
                  <br />
                  <br />
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <Tabs type="card">
                    {/* <TabPane tab="Last Month" key="1">
                      <ChartistGraph
                        className="height-300"
                        data={areaData(audience.sessionLastMonth)}
                        options={areaOptions}
                        type="Line"
                      />
                    </TabPane> */}
                    <TabPane tab="Last Week" key="2">
                      <ChartistGraph
                        className="height-300"
                        data={areaData2(audience.sessionLastWeek)}
                        options={areaOptions}
                        type="Line"
                      />
                    </TabPane>
                    {/* <TabPane tab="Date" key="3">
                      <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={startValue}
                        placeholder="Start"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                      <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={endValue}
                        placeholder="End"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                      <ChartistGraph
                        className="height-300"
                        data={areaData2(audience.sessionLastWeek)}
                        options={areaOptions}
                        type="Line"
                      />
                    </TabPane> */}
                  </Tabs>
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
                    values: [1, 2, 1, 2, 1, 2, 1, 2, 0, 18, 20, 26],
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
                    values: [2, 2, 3, 2, 3, 2, 1, 2, 3, 1, 20, 26],
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
                    values: [2, 1, 2, 1, 2, 2, 1, 1, 3, 1, 20, 26],
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
              amount={bounceRate}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [3, 1, 1, 3, 3, 5, 3, 3, 4, 18, 20, 26],
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
                    values: [1, 3, 2, 5, 2, 4, 1, 2, 0, 18, 20, 26],
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
                    values: [5, 3, 2, 2, 3, 1, 1, 2, 0, 18, 20, 26],
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
                    values: [3, 1, 1, 2, 1, 2, 1, 2, 0, 18, 20, 26],
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
              amount={numberSessionUser}
              chartProps={{
                width: 180,
                height: 107,
                lines: [
                  {
                    values: [4, 2, 3, 2, 1, 2, 1, 2, 0, 18, 20, 26],
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
                      <TabPane tab="Location" key="4">
                        <Table columns={columnsLocation} dataSource={data} />
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
