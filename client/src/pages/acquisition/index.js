import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
import ReactTable from 'react-table'
import { Select } from 'antd'
import 'react-table/react-table.css'
import styles from './style.module.scss'

function lineData(series) {
  return {
    labels: [
      '7 day ago',
      '6 day ago',
      '5 day ago',
      '4 day ago',
      '3 day ago',
      '2 day ago',
      'Yesterday',
    ],
    series: [series],
  }
}

const colors = {
  primary: '#01a8fe',
  def: '#d17905',
  success: '#46be8a',
  danger: '#fb434a',
}

const lineOptions = {
  fullWidth: !0,
  chartPadding: {
    right: 40,
  },
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

function pie(social, search, direct, others) {
  return {
    data: {
      columns: [['Social', social], ['Search', search], ['Direct', direct], ['Others', others]],
      type: 'pie',
    },
    color: {
      pattern: [colors.primary, colors.success, colors.def, colors.danger],
    },
  }
}

const columns = [
  {
    Header: '  ',
    columns: [
      {
        Header: '',
        accessor: 'acquistion',
      },
    ],
  },
  {
    Header: 'Acquisition',
    columns: [
      {
        Header: 'Visitor',
        accessor: 'visitor',
      },
      {
        Header: 'Returning Visitor',
        accessor: 'revisitor',
      },
      {
        Header: 'Sessions',
        accessor: 'sessions',
      },
    ],
  },
  {
    Header: 'Behavior',
    columns: [
      {
        Header: 'Bounce Rate',
        accessor: 'bouncerate',
      },
      {
        Header: 'Pages/Session',
        accessor: 'pagessession',
      },
      {
        Header: 'Avg. Session Duration',
        accessor: 'avgsessionduration',
      },
    ],
  },
  {
    Header: 'Conversions',
    columns: [
      {
        Header: 'Conversion Rate',
        accessor: 'conversionrate',
      },
      {
        Header: 'Completion',
        accessor: 'completion',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
  },
]
const { Option } = Select

function handleChange(value) {
  console.log(`selected ${value}`)
}

@connect(({ acquistion }) => ({ acquistion }))
class Acquisition extends React.Component {
  render() {
    const { acquistion } = this.props
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Acquisition" />
        <div className="row">
          <div className="col-lg-4">
            <div className="card card--fullHeight">
              <div className="card-header">
                <div className="utils__title row">
                  <div className="col-xl-7">
                    <strong> Aquisition</strong>
                  </div>
                  <div className="col-xl-5">
                    <Select defaultValue="lastmonth" style={{ width: 120 }} onChange={handleChange}>
                      <Option value="lastmonth">Last Month</Option>
                      <Option value="lastweek">Last Week</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <C3Chart
                    data={
                      pie(
                        acquistion.acquistionSocial,
                        acquistion.acquistionSearch,
                        acquistion.acquistionDirect,
                        acquistion.acquistionOther,
                      ).data
                    }
                    color={pie.color}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title row">
                  <div className="col-xl-9">
                    <strong> Visitors</strong>
                  </div>
                  <div className="col-xl-3">
                    <Select defaultValue="lastmonth" style={{ width: 120 }} onChange={handleChange}>
                      <Option value="lastmonth">Last Month</Option>
                      <Option value="lastweek">Last Week</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <ChartistGraph
                    className="height-300"
                    data={lineData(acquistion.visitorLastWeek)}
                    options={lineOptions}
                    type="Line"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="row">
          <ReactTable
            columns={columns}
            data={acquistion.acquistionTable}
            defaultPageSize={4}
            showPagination={false}
            className={`-striped -highlight ${styles.tablewith}`}
          />
        </div>
      </Authorize>
    )
  }
}

export default Acquisition
