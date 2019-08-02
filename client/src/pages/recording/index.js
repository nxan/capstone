import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import table from './data.json'


@connect(({ video }) => ({ video }))
class VideosList extends React.Component {
  state = {
    tableData: table.data,
    video: this.props,
    filterDropdownVisible: false,
    searchText: '',
    // playerString: [],
    filtered: false,
    // visibled: false,
  }

  componentDidMount() {
    let script = '<script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>'
    $('head').prepend(script);
    script = '<script src="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/index.js"></script>'
    $('head').prepend(script);
    let link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />';
    $('head').prepend(link);
    link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />'
    $('head').prepend(link);
    $('#close').click(function hideDiv() {
      /* eslint-disable no-new */
      /* eslint new-cap: ["error", { "newIsCap": false }] */
      /* global rrwebPlayer  */
      /* eslint no-undef: "error" */
      // const events = [[], []]
      // new rrwebPlayer({
      //   target: document.getElementById('video'),
      //   data: {
      //     events,
      //   }
      // })
      // $('#container').hide();
      // $('#video').hide();
      // $('#video').html('');
    });
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

  replay = () => {
    /* eslint-disable no-new */
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    /* global rrwebPlayer  */
    /* eslint no-undef: "error" */
    const { events } = this.state
    console.log(events.length)
    new rrwebPlayer({
      target: document.getElementById('video'),
      data: {
        events,
      }
    })

  }

  replayFormatSetter = () => {
    let data = [];
    const { playerString } = this.state
    console.log(playerString.length)
    playerString.forEach((entry) => {
      data = data.concat(entry);

      // return data;
    });
    // this.setState({ playerString: data })
    this.setState({
      //  visibled: true,
      events: data
    });
    this.replay();
    // return playerString;
  }


  closeModal() {
    // component.addEventListener('finish', () => console.log('finish'));
    $('#container').hide();
    this.setState({
      //  visibled: false,
      events: []
    });
  }

  openModal() {
    this.setState({
      //  visibled: true
    });

  }

  render() {
    const { video, searchText, filtered, filterDropdownVisible } = this.state
    const videoData = Object.values(video.video);

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
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
            <Link to={{
              pathname: '/recording/replay',
              id: record.id
            }}
            >
              <Button>Play</Button>
            </Link>
          </span>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'date_time',
        key: 'date_time',
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
              dataSource={videoData[0]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default VideosList
