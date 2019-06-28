import React from 'react'
import { Table } from 'antd'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
// eslint-disable-next-line camelcase
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { taskTableData } from './data.json'

am4core.useTheme(am4themes_animated)
const biPolarBarData = {
  labels: ['20', '15', '10', '5', '1'],
  series: [[1, 2, 1.5, 1, 1]],
}

const biPolarBarOptions = {
  high: 2,
  low: 0,
  axisX: {
    labelInterpolationFnc(value, index) {
      return index % 1 === 0 ? value : null
    },
  },
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

const taskTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript: void(0);">{text}</a>,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    render: text => <a href="javascript: void(0);">{text}</a>,
  },
]

class Realtime extends React.Component {
  componentDidMount() {
    const chart = am4core.create('chartdiv', am4maps.MapChart)
    const title = chart.titles.create();
    title.text = "[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder";
    title.textAlign = "middle";

    const latlong = {
      "AD": { "latitude": 42.5, "longitude": 1.5 },
      //   "AE": {"latitude":24, "longitude":54}
    };

    const mapData = [
      { "id": "AD", "name": "Afghanistan", "value": 32358260, "color": chart.colors.getIndex(0) },
      //   { "id":"AL", "name":"Albania", "value":3215988, "color":chart.colors.getIndex(1) }
    ];

    // Add lat/long information to data
    for (let i = 0; i < mapData.length; i+=1) {
      mapData[i].latitude = latlong[mapData[i].id].latitude;
      mapData[i].longitude = latlong[mapData[i].id].longitude;
    }

    // Set map definition
    // eslint-disable-next-line camelcase
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;

    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "value";

    const imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.nonScaling = true

    const circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = "color";
    circle.tooltipText = "{name}: [bold]{value}[/]";

    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 4,
      "max": 30,
      "dataField": "value"
    })
    this.chart = chart
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Realtime" />
        <section className="row">
          <div className="col-lg-4">
            <section className="card text-center">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Right Now</strong>
                </div>
              </div>
              <div className="card-body">
                <strong className="font-size-50">0</strong>
              </div>
              <div className="card-footer">
                <span>USERS ON SITE</span>
              </div>
            </section>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>PageViews</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-5">
                  <span>Per min</span>
                  <ChartistGraph
                    className="height-100"
                    data={biPolarBarData}
                    options={biPolarBarOptions}
                    type="Bar"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="row">
          <div className="col-lg-4">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="row">
          <div className="col-lg-4">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Task Table</strong>
                </div>
                <div className="utils__titleDescription">
                  Block with important Task Table information
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      columns={taskTableColumns}
                      dataSource={taskTableData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Top Location</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
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
export default Realtime
