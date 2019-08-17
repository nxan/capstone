import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { Table, Switch, Button } from 'antd'

class Settings extends React.Component {

  render() {
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
    const data = [
      {
        page_url: 'capstonefpt.myshopify.com/collections/frontpage/products/galaxy-s9',
        id: '1',
        key: 'page1',
      },
      {
        page_url: 'capstonefpt.myshopify.com/products/animal-print-hair-band-various-colours',
        id: '2',
        key: 'page2',
      },
      {
        page_url: 'capstonefpt.myshopify.com/collections/all',
        id: '3',
        key: 'page3',
      },
      {
        page_url: 'capstonefpt.myshopify.com/products/black-and-blue-skull-arm-length-fingerless-gloves',
        id: '3',
        key: 'page4',
      },
      {
        page_url: 'capstonefpt.myshopify.com/cart',
        id: '3',
        key: 'page5',
      },
      {
        page_url: 'capstonefpt.myshopify.com/products/bejewelled-black-diamond-skull-belt-buckle',
        id: '3',
        key: 'page6',
      },
      {
        page_url: 'capstonefpt.myshopify.com/products/animal-print-hair-band-various-colours',
        id: '3',
        key: 'page7',
      },
    ];
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Settings" />
        <section className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <Table columns={columns} dataSource={data} />
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
