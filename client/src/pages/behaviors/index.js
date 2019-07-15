import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { Table } from 'antd'

const columns = [
  {
    title: 'Page',
    dataIndex: 'page',
    key: 'page',
  },
  {
    title: 'Total Sessions',
    dataIndex: 'sessions',
    key: 'sessions',
    width: '12%',
  },
  {
    title: 'End Session Here',
    dataIndex: 'endsession',
    width: '30%',
    key: 'endsession',
  },
];

const data = [
  {
    key: 1,
    page: 'Home',
    sessions: 500,
    endsession: 100,
    children: [
      {
        key: 11,
        page: 'Interaction 1',
        sessions: 42,
        endsession: 44,
        children: [
          {
            key: 111,
            page: 'Interaction 2',
            sessions: 16,
            endsession: 3,
            children: [
              {
                key: 211,
                page: 'Interaction 3',
                sessions: 16,
                endsession: 3,
                children: [
                  {
                    key: 311,
                    page: 'Interaction 4',
                    sessions: 16,
                    endsession: 3,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];


class Behavior extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Behavior" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Users Behavior Table</strong>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
        </section>
      </Authorize>
    )
  }
}

export default Behavior
