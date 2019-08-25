import React from 'react'
import { Table, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import theme from 'theme.css';

import $ from 'jquery'

import Autosuggest from 'react-autosuggest'
import theme from './style.module.scss'



function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderSuggestion(suggestion) {
    console.log(suggestion)
    // return (
    //     <span>{suggestion.page_url}</span>
    // );
}

@connect(({ heatmap }) => ({ heatmap }))
class HeatMapList extends React.Component {
    state = {
        heatmap: this.props,
        suggestions: [],
        value: ''
        // startValue: null,
        // endValue: null,
        // endOpen: false,
        // searchText: ''
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
        const { dispatch } = this.props;
        dispatch({
            type: 'heatmap/LOAD_HEATMAP',
        })
    }

    // onChange = (newValue) => {
    //     console.log(newValue)
    //     this.setState({
    //         value: newValue
    //     });
    // };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());
        const { heatmap } = this.state
        // console.log(heatmap)
        const data = Object.values(heatmap.heatmap);
        if (escapedValue === '') {
            console.log(true)
            return data;
        }

        const regex = new RegExp('' + escapedValue , '');
      
        const filter = data[0].filter(record => regex.test(record.page_url));
   

        return filter
    }

    // onChange = (field, value) => {
    //     this.setState({
    //         [field]: value,
    //     })
    // }

    // onInputChange = e => {
    //     this.setState({ searchText: e.target.value })
    // }

    getSuggestionValue = suggestion => {
        console.log(suggestion)
        return suggestion.page_url
    }

    // onSearch = (value) => {
    //     const { heatmap } = this.state
    //     let tableData = []
    //     console.log(heatmap)
    //     tableData = heatmap.heatmap
    //     console.log(tableData)
    //     const reg = new RegExp(value)
    //     console.log(reg)

    //     // let searchedTable = tableData.filter((record) => {
    //     //     const match = record.page_url.match(reg) 
    //     //     if(match){
    //     //         return tableData 
    //     //     }
    //     // })
    //     // this.setState({
    //     //     heatmap: searchedTable
    //     // })
    // }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState(prevState => {
            const heatmap = { ...prevState.heatmap };
            heatmap.newHeatMap = this.getSuggestions(value);
            return { heatmap }

        })
        // this.setState({suggestions: this.getSuggestions(value)})
        // this.setState({
        //     heatmap: this.getSuggestions(value)
        // });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    linkSearchInput = node => {
        this.searchInput = node
    }


    render() {
        // const { heatmap } = this.props

        const { value, suggestions, heatmap } = this.state
        const heatmapData = Object.values(heatmap.heatmap);;
        if (typeof heatmap.newHeatMap !== 'undefined') {
            if (value !== '') {
                heatmapData[0] = Object.values(heatmap.newHeatMap);
            }
        }

        /* eslint object-shorthand: [2, "consistent"] */
        const inputProps = {
            placeholder: "Type to search page url",
            value: value,
            onChange: this.onChange
        };
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
                    <div className="col-lg-6" />
                    <div className="col-lg-6 text-right">
                        <Autosuggest
                            suggestions={suggestions}
                            theme={theme}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                        {/* <DatePicker
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
                        /> */}
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
                            dataSource={heatmapData[0]}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeatMapList
