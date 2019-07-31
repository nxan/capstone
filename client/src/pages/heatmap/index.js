import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Modal from 'react-awesome-modal';
import $ from 'jquery'
import styles from './style.module.scss'

@connect(({ video }) => ({ video }))
class HeatMapList extends React.Component {
    state = {
        video: this.props,
        filterDropdownVisible: false,
        searchText: '',
        // events: [],
        // playerString: [],
        filtered: false,
        visibled: false,
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

    onInputChange = e => {
        this.setState({ searchText: e.target.value })
    }

    onSearch = () => {
        const { searchText, tableData } = this.state
        const reg = new RegExp(searchText, 'gi')
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            video: tableData
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
        $('.spy_frame').contents().find("body").append(this.heatMapScript(data))
        // $('.spy_frame').contents().find("body").abc()
        // return playerString;
    }





    heatMapScript = (heatMap) => {
        // const data = JSON.parse(heatMap)
        console.log(heatMap.length);
        localStorage.setItem('heatmap', JSON.stringify(heatMap));
        // console.log(JSON.parse(localStorage.getItem('heatmap')))
        const script = "<script>var heatmap = h337.create({container: document.body}); heatmap.setData({data : JSON.parse(localStorage.getItem('heatmap'))}) console.log(JSON.parse(localStorage.getItem('heatmap'));<\/script>)";
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
                // $('.frame').show();
                // this.setState({
                //     events: data.heatMap
                // })
                this.replayFormatSetter(data);
                // const heatmap = 
                // $('.frame').contents().find("body").append(heatMapScript(data.heatMap))
            }).catch(error => console.log(error));
    }

    openModal(id) {
        this.setState({
            visibled: true
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
                $('.spy_frame').html('')
                $('.spy_frame').contents().find("head").append("<script src='https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.js'></script>")
                $('.spy_frame').contents().find("head").append("<script src='https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.min.js'></script>")
                $('.spy_frame').contents().find("body").append(data.web);
                this.getArrayHeatMap(id)
                // console.log(data);
                // this.setState({
                //     events: data.heatMap
                // })
                // this.replayFormatSetter(data.heatMap);
                // const heatmap = 
                // $('.frame').contents().find("body").append(heatMapScript(data.heatMap))
            }).catch(error => console.log(error));


    }

    closeModal() {
        this.setState({
            visibled: false
        });
    }

    render() {
        const { video, searchText, filtered, filterDropdownVisible, visibled } = this.state
        // console.log(video.video.heatmap)
        const heatmapData = Object.values(video.video.heatmap);
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
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'play',
                render: (text, record) => (
                    <span>
                        <Button onClick={() => this.openModal(record.id)}>Play</Button>
                        <Modal visible={visibled} width="100%" height="100%" onClickAway={() => this.closeModal()}>
                            <div className={'frame '.concat(styles.frame)}>
                                <iframe className={'spy_frame '.concat(styles.spy_frame)} title="myFrame" />
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                            </div>
                        </Modal>
                    </span>
                ),
            },
            {
                title: 'Date',
                dataIndex: 'video_time',
                key: 'video_time',
                sorter: (a, b) => a.video_time.length - b.video_time.length,
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        {text}
                    </a>
                ),
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={this.linkSearchInput}
                            placeholder="Search name"
                            value={searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            Search
                        </Button>
                    </div>
                ),
                filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible,
                onFilterDropdownVisibleChange: visible => {
                    this.setState(
                        {
                            filterDropdownVisible: visible,
                        },
                        () => this.searchInput && this.searchInput.focus(),
                    )
                },
            },
            {
                title: 'Action',
                key: 'remove',
                render: () => (
                    <span>
                        <Button icon="cross" size="small">
                            Remove
                        </Button>
                    </span>
                ),
            },
        ]

        return (

            <div>
                <Helmet title="Video List" />
                <div className="card">
                    <div className="card-header">
                        <div className="utils__title">
                            <strong>Video List</strong>
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
