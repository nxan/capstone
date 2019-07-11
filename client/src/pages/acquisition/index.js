import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import styles from './style.module.scss'

const lineData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [[0, 0, 0, 0, 0]],
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

const pie = {
  data: {
    columns: [['exp', 30], ['exp2', 120]],
    type: 'pie',
  },
  color: {
    pattern: [colors.primary, colors.success],
  },
}

class Acquisition extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Acquisition" />
        <div className="row">
          <div className="col-lg-4">
            <div className="card card--fullHeight">
              <div className="mb-5">
                <C3Chart data={pie.data} color={pie.color} />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-5">
              <ChartistGraph
                className="height-300"
                data={lineData}
                options={lineOptions}
                type="Line"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-5">
              <ChartistGraph
                className="height-300"
                data={lineData}
                options={lineOptions}
                type="Line"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <ReactTable
            columns={[
              {
                Header: '  ',
                columns: [
                  {
                    Header: '',
                    accessor: '',
                  },
                ],
              },
              {
                Header: 'Acquisition',
                columns: [
                  {
                    Header: 'Users',
                    accessor: 'firstName',
                  },
                  {
                    Header: 'New Users',
                    id: 'newusers',
                  },
                  {
                    Header: 'Sessions',
                    id: 'sessions',
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
            ]}
            defaultPageSize={10}
            className={`-striped -highlight ${
              styles.tablewith
              }`}
          />
        </div>
      </Authorize>
    )
  }
}

export default Acquisition
