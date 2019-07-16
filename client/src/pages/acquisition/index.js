import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import styles from './style.module.scss'
import { dataTable } from './dataTable'

function lineData(data) {
  console.log(data)
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
    series: [data],
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
        Header: 'Users',
        accessor: 'users',
      },
      {
        Header: 'New Users',
        accessor: 'newusers',
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
                <div className="utils__title">
                  <strong> Aquisition</strong>
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
                <div className="utils__title">
                  <strong> Visitors</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <ChartistGraph
                    className="height-400"
                    data={lineData(acquistion.visitorLastWeek)}
                    options={lineOptions}
                    type="Line"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <ReactTable
                  columns={columns}
                  data={dataTable}
                  defaultPageSize={4}
                  showPagination={false}
                  className={`-striped -highlight ${styles.tablewith}`}
                />
              </div>
            </div>
          </div>
        </section>
      </Authorize>
    )
  }
}

export default Acquisition
