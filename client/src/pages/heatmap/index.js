import React from 'react'
import { Table, Button, DatePicker } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import $ from 'jquery'

@connect(({ heatmap }) => ({ heatmap }))
class HeatMapList extends React.Component {
    state = {
        heatmap: this.props,
        startValue: null,
        endValue: null,
        endOpen: false,
    }

    componentDidMount() {
        let script = 'https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.js'
        $('head').prepend(script);
        script = '<script src="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/index.js"></script>'
        $('head').prepend(script);
        let link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />';
        $('head').prepend(link);
        link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />'
        $('head').prepend(link);

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
    }

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true })
        }
    }

    handleEndOpenChange = open => {
        this.setState({ endOpen: open })
    }

    

    onInputChange = e => {
        this.setState({ searchText: e.target.value })
    }

    onSearch = () => {
        const { searchText, tableData } = this.state
        const reg = new RegExp(searchText, 'gi')
        this.setState({
            heatmap: tableData
                .map(record => {
                    const match = record.name.match(reg)
                    if (!match) {
                        return null
                    }
                    return {
                        ...record,
                        name: (
                            <span>
                                {record.name
                                    .split(reg)
                                    .map((text, i) =>
                                        i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                                    )}
                            </span>
                        ),
                    }
                })
                .filter(record => !!record),
        })
    }

    linkSearchInput = node => {
        this.searchInput = node
    }






    replayFormatSetter = (events) => {
        let data = [];
        let array = [];
        array = events
        // console.log(playerString.length)
        console.log(events);
        array.forEach((entry) => {
            data = data.concat(entry);
        });
        this.heatMapScript(data)
    }





    heatMapScript = (heatMap) => {
        // const data = JSON.parse(heatMap)
        console.log(heatMap.length);
        localStorage.setItem('heatmap', JSON.stringify(heatMap));
        /* eslint global-require: */
        const h337 = require('heatmap.js')
        const heatmap = h337.create({
            container: document.getElementById('frame')
        });
        heatmap.setData({
            data: JSON.parse(localStorage.getItem('heatmap'))
        });
        // document.getElementsByClassName('spy_frame').contentWindow.postMessage(JSON.stringify({ key: 'levi' }), "*");
        // console.log(JSON.parse(localStorage.getItem('heatmap')))
        let script = '<script>alert(1)<'
        script += "/script>"

        // const script = "<script type='text/javascript'>var heatmap1 = function(){  var heatmap = h337.create({container: document.body}); heatmap.setData({data : JSON.parse(localStorage.getItem('heatmap'))}) console.log(JSON.parse(localStorage.getItem('heatmap'));alert('Look at me, executed inside an iframe!');\n} <";
        // script += "/script>)";
        return script
    }

    getArrayHeatMap = (id) => {
        fetch('http://localhost:8888/api/page/getArrayHeatMap/'.concat(id), {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((data) => data.json())
            .then((data) => {
                this.replayFormatSetter(data);
            }).catch(error => console.log(error));
    }

    openModal(id) {
        this.setState({
            //  visibled: true
        });

        fetch('http://localhost:8888/api/page/getOneHeatMap/'.concat(id), {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((data) => data.json())
            .then((data) => {
                $('.frame').show();
                $(".spy_frame").contents().find("body").html('');
                // $('.spy_frame').html('')
                $('.spy_frame').contents().find("head").append("<script src='https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.js'></script>")
                $('.spy_frame').contents().find("head").append("<script src='https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.min.js'></script>")
                $('.spy_frame').contents().find("body").append(data.web);
                this.getArrayHeatMap(id)
            }).catch(error => console.log(error));


    }


    render() {
        const { heatmap, startValue, endValue, endOpen } = this.state
        console.log(heatmap.heatmap.heatmap)
        const heatmapData = Object.values(heatmap.heatmap.heatmap);
        // const heatmapData = heatmap.heatmap.heatmap;
        const columns = [
            {
                title: 'Page',
                dataIndex: 'page_url',
                key: 'page_url',
                render: (text) => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        {text}
                    </a>
                ),
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'play',
                render: (text, record) => (
                    <span>
                        <Link to={{
                            pathname: '/heatmap/shop',
                            id: record.id
                        }}
                        >
                            <Button>View</Button>
                        </Link>
                    </span>
                ),
            },
        ]

        return (

            <div>
                <Helmet title="Heat Map List" />
                <div className="row">
                    <div className="col-lg-8" />
                    <div className="col-lg-4 text-right">
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
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="utils__title">
                            <strong>Heat Map List </strong>
                        </div>
                    </div>
                    <div className="card-body">
                        <Table
                            className="utils__scrollTable"
                            scroll={{ x: '100%' }}
                            columns={columns}
                            dataSource={heatmapData}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeatMapList
