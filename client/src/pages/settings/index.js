import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { Table, Switch, Button } from 'antd'
import { connect } from 'react-redux'

@connect(({ settings }) => ({ settings }))
class Settings extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'settings/LOAD_PAGES',
    })
  }
  
  render() {
    const { settings } = this.props
    const columns = [
      {
        title: 'Page',
        dataIndex: 'page_url',
        key: 'page',
      },
      {
        title: 'Record',
        dataIndex: 'id',
        key: 'record',
        width: '12%',
        render: () => (
          <Switch defaultChecked />
        )
      },
      {
        title: 'Heatmap',
        dataIndex: 'id',
        width: '10%',
        key: 'heatmap',
        render: () => (
          <Switch defaultChecked />
        )
      },
    ];
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Settings" />
        <section className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <Table columns={columns} dataSource={settings.pages} />
              </div>
            </div>
          </div>
        </section>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Authorize>
    )
  }
}

export default Settings
