import React from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ChartCard from 'components/Components/ChartCard'
import Authorize from 'components/LayoutComponents/Authorize'
import ChartistGraph from 'react-chartist'
import Donut from 'components/Components/Donut'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
import styles from './style.module.scss'


const colors = {
  primary: '#01a8fe',
  def: '#d17905',
  success: '#46be8a',
  danger: '#fb434a',
}


function fetchDataTrafficSource(social, search, direct, other) {
  const total = social + search + direct + other
  return [{
    "key": "1",
    "type": "Social",
    "amount": `${Number((social / total) * 100).toFixed(2)}%`
  }, {
    "key": "2",
    "type": "Search",
    "amount": `${Number((search / total) * 100).toFixed(2)}%`
  }, {
    "key": "3",
    "type": "Direct",
    "amount": `${Number((direct / total) * 100).toFixed(2)}%`
  }, {
    "key": "4",
    "type": "Others",
    "amount": `${Number((other / total) * 100).toFixed(2)}%`
  }]
}

function fetchDataTrafficSourcePie(social, search, direct, other) {
  const total = social + search + direct + other
  return {
    "series": [
      { "name": "Social", "value": Number((social / total) * 100).toFixed(2) },
      { "name": "Search", "value": Number((search / total) * 100).toFixed(2) },
      { "name": "Direct", "value": Number((direct / total) * 100).toFixed(2) },
      { "name": "Others", "value": Number((other / total) * 100).toFixed(2) }
    ]
  }
}

const supportCasesTableColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
    render: amount => {
      if (amount === 'Negative') {
        return <span className="text-danger font-weight-bold">{amount}</span>
      }
      return <span className="text-primary font-weight-bold">{amount}</span>
    },
  },
]
const supportCasesPieOptions = {
  donut: true,
  donutWidth: 35,
  showLabel: false,
  plugins: [
    ChartistTooltip({
      anchorToPoint: false,
      appendToBody: true,
      seriesName: false,
    }),
  ],
}
function pie(desktop, mobile, tablet, other) {
  return {
    data: {
      columns: [['Desktop', desktop], ['Mobile', mobile], ['Tablet', tablet], ['Others', other]],
      type: 'pie',
    },
    color: {
      pattern: [colors.primary, colors.danger, colors.success, colors.def],
    },
  }
}

const day = ['7 day ago', '6 day ago', '5 day ago', '4 day ago', '3 day ago', '2 day ago', 'Yesterday']

function fetchDataSpline(a, b) {
  return {
    data: {
      columns: [
        ["New Visitors", [a[0]], [a[1]], [a[2]], [a[3]], [a[4]], [a[5]], [a[6]]],
        ["Old Visitors", [b[0]], [b[1]], [b[2]], [b[3]], [b[4]], [b[5]], [b[6]]],
      ]
    },
  }
}

function spline() {
  return {
    color: {
      pattern: [colors.primary, colors.danger],
    },
    axis: {
      x: {
        type: 'category',
        categories: day
      },
      y: {
        max: 50,
        min: 0,
        tick: {
          outer: !1,
          count: 7,
          values: [0, 10, 20, 30, 40, 50],
        },
      },
    },
    grid: {
      x: {
        show: !1,
      },
      y: {
        show: !0,
      },
    },
  }
}

@connect(({ user }) => ({ user }))
class Dashboard extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Dashboard" />
        <div className="row">
          <div className="col-xl-3">
            <ChartCard
              title="Total Sessions"
              amount={user.session}
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
          <div className="col-xl-3">
            <ChartCard
              title="Total visitors"
              amount={user.visitor}
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
          <div className="col-xl-3">
            <ChartCard
              title="Avg. Session duration"
              amount={user.avgDurationSession}
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
          <div className="col-xl-3">
            <ChartCard
              title="Total Pageview"
              amount={user.pageview}
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
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="text-black">
                  <strong>Visitors</strong>
                </h5>
              </div>
              <div className="card-body">
                <C3Chart
                  data={fetchDataSpline(user.newVisitorLastWeek, user.oldVisitorLastWeek).data}
                  color={spline().color}
                  axis={spline().axis}
                  grid={spline().grid}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Traffic Sources</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="mb-3">
                      <Table
                        className="utils__scrollTable"
                        scroll={{ x: '100%' }}
                        dataSource={fetchDataTrafficSource(user.acquistionSocial, user.acquistionSearch, user.acquistionDirect, user.acquistionOther)}
                        columns={supportCasesTableColumns}
                        pagination={false}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div
                      className={`h-100 d-flex flex-column justify-content-center align-items-center ${
                        styles.chartPieExample
                        }`}
                    >
                      <ChartistGraph
                        data={fetchDataTrafficSourcePie(user.acquistionSocial, user.acquistionSearch, user.acquistionDirect, user.acquistionOther)}
                        type="Pie"
                        options={supportCasesPieOptions}
                      />
                      <div className="text-center">
                        <span className="mr-2">
                          <Donut type="success" name="Social" />
                        </span>
                        <span className="mr-2">
                          <Donut type="primary" name="Search" />
                        </span>
                        <span className="mr-2">
                          <Donut type="danger" name="Direct" />
                        </span>
                        <span className="mr-2">
                          <Donut type="warning" name="Others" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title utils__title--flat">
                  <strong className="text-uppercase font-size-16">Devices</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <C3Chart data={pie([user.deviceDesktop], [user.deviceMobile], [user.deviceTablet], [user.deviceOther]).data} color={pie().color} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default Dashboard
