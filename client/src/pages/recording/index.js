import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Modal from 'react-awesome-modal';
import table from './data.json'

@connect(({ video }) => ({ video }))
class ProductsList extends React.Component {
  state = {
    tableData: table.data,
    video: this.props,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    visibled: false,
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

  openModal() {
    this.setState({
      visibled: true
    });
  }

  closeModal() {
    this.setState({
      visibled: false
    });
  }

  render() {
    const { video, searchText, filtered, filterDropdownVisible, visibled } = this.state
    const videoData = Object.values(video.video);

    console.log(videoData);

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text.id}
          </a>
        ),
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'play',
        render: () => (
          <span>
            <Button onClick={() => this.openModal()}>Play</Button>
            <Modal visible={visibled} width="75%" height="75%" onClickAway={() => this.closeModal()}>
              <div>
                <div id='videoImg'>
                  <img id="frame" alt="Fake Child Education Site Label" />
                  <div id="click" />
                  <div id="mouse" />
                </div>
                <div id="video">
                  <iframe id="spy_frame" title="myFrame">video</iframe>
                </div>
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
              dataSource={videoData[0].video}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductsList
