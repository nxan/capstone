import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { Table } from 'antd'
import { connect } from 'react-redux'

const columns = [
  {
    title: 'Page',
    dataIndex: 'page_url',
    key: 'page',
  },
  {
    title: 'Total',
    dataIndex: 'num',
    key: 'sessions',
    width: '12%',
  },
  {
    title: 'End here',
    dataIndex: 'end_session',
    width: '30%',
    key: 'endsession',
  },
];

@connect(({ behavior }) => ({ behavior }))
class Behavior extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'behavior/LOAD_BEHAVIOR',
    })
  }
  
  render() {
    const { behavior } = this.props
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Behavior" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Users Behavior</strong>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <Table columns={columns} dataSource={behavior.behavior} />
              </div>
            </div>
          </div>
        </section>
      </Authorize>
    )
  }
}

export default Behavior
