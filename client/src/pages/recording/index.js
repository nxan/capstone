import React from 'react'
import { Table,  Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import $ from 'jquery'
import { Link } from 'react-router-dom'

@connect(({ video }) => ({ video }))
class VideosList extends React.Component {
  state = {
    video: this.props,

  }

  componentDidMount() {
    let script = '<script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>'
    $('head').prepend(script);
    script = '<script src="https://cdn.jsdelivr.net/npm/rrweb-player@0.3.14/dist/index.js"></script>'
    $('head').prepend(script);
    let link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />';
    $('head').prepend(link);
    link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />'
    $('head').prepend(link);

    $('#close').click(function hideDiv() {
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'video/LOAD_VIDEO',
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
    const { video} = this.state
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
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
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
              dataSource={videoData[0]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default VideosList
