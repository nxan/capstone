import React from 'react'
// import { connect } from 'react-redux'
import $ from 'jquery'
import styles from './style.module.scss'

// @connect(({ video }) => ({ video }))
class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.location.id,
        }
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

        const { id } = this.state

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
                document.getElementById('shop').innerHTML = data.web;
                this.getArrayHeatMap(id)

            }).catch(error => console.log(error));

    }

    // onInputChange = e => {
    //     this.setState({ searchText: e.target.value })
    // }

    // onSearch = () => {
    //     const { searchText, tableData } = this.state
    //     const reg = new RegExp(searchText, 'gi')
    //     this.setState({
    //         filterDropdownVisible: false,
    //         filtered: !!searchText,
    //         video: tableData
    //             .map(record => {
    //                 const match = record.name.match(reg)
    //                 if (!match) {
    //                     return null
    //                 }
    //                 return {
    //                     ...record,
    //                     name: (
    //                         <span>
    //                             {record.name
    //                                 .split(reg)
    //                                 .map((text, i) =>
    //                                     i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
    //                                 )}
    //                         </span>
    //                     ),
    //                 }
    //             })
    //             .filter(record => !!record),
    //     })
    // }

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
        const config = {
            container: document.getElementById('shop'),
            radius: 20,
            maxOpacity: .7,
            minOpacity: 0,
            blur: .75
        };
        const heatmap = h337.create(config);
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
                // $('.frame').show();
                // this.setState({
                //     events: data.heatMap
                // })
                this.replayFormatSetter(data);
                // const heatmap = 
                // $('.frame').contents().find("body").append(heatMapScript(data.heatMap))
            }).catch(error => console.log(error));
    }


    render() {
        return (
            <div id="shop" className={styles.frame}>
                {/* <iframe id='frame2' className={'spy_frame '.concat(styles.spy_frame)} title="myFrame" /> */}
                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
            </div>
        )
    }
}

export default HeatMap
