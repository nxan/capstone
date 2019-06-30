import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import ChartistGraph from 'react-chartist'
import ChartCard from 'components/Components/ChartCard'
import { Helmet } from 'react-helmet'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import C3Chart from 'react-c3js'

const areaData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [[5, 9, 7, 8, 5, 3, 5, 4]],
}

const colors = {
  primary: '#01a8fe',
  def: '#acb7bf',
  success: '#46be8a',
  danger: '#fb434a',
}

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

class Acquisition extends React.Component {
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
            <ChartCard
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
            <ChartCard
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
            <ChartCard
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
            <ChartCard
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
            <ChartCard
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
            <ChartCard
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
            <ChartCard
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
            <ChartCard
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
      </Authorize>
    )
  }
}
export default Acquisition
