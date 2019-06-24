import React from 'react'
import { Table } from 'antd'
import { Helmet } from 'react-helmet'
import ChartCard from 'components/Components/ChartCard'
import Authorize from 'components/LayoutComponents/Authorize'
import ChartistGraph from 'react-chartist'
import Donut from 'components/Components/Donut'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import styles from './style.module.scss'
import { weekChartistData, supportCasesPieData, supportCasesTableData } from './data.json'

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
const weekChartistOptions = {
  fullWidth: true,
  showArea: false,
  chartPadding: {
    right: 30,
    left: 0,
  },
  plugins: [
    // tooltip({
    //   seriesName: false,
    // }),
  ],
}
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
class DashboardAlpha extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Dashboard" />
        <div className="row">
          <div className="col-xl-3">
            <ChartCard
              title="Total Sessions"
              amount="1240"
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
              amount="$1,240.00"
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
              amount="$240.56"
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
              title="Online visitors"
              amount="$240.56"
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
                <Donut type="primary" name="Nuts" />
                <Donut type="success" name="Apples" />
                <Donut color="yellow" name="Peaches" />
              </div>
              <div className="card-body">
                <ChartistGraph
                  data={weekChartistData}
                  options={weekChartistOptions}
                  type="Line"
                  className="chart-area height-300 mt-4 chartist"
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
                  <strong className="text-uppercase font-size-16">Trafic sources</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="mb-3">
                      <Table
                        className="utils__scrollTable"
                        scroll={{ x: '100%' }}
                        dataSource={supportCasesTableData}
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
                        data={supportCasesPieData}
                        type="Pie"
                        options={supportCasesPieOptions}
                      />
                      <div className="text-center">
                        <span className="mr-2">
                          <Donut type="success" name="Facebook" />
                        </span>
                        <span className="mr-2">
                          <Donut type="primary" name="Email" />
                        </span>
                        <span className="mr-2">
                          <Donut type="danger" name="Others" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default DashboardAlpha
