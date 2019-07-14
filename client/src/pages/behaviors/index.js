import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import Tree from 'react-tree-graph'
import './style.module.scss'
import 'react-tree-graph/dist/style.css'

const data = {
  name: 'Home',
  children: [
    {
      name: 'Site1',
      children: [
        {
          name: 'Site1.1',
        },
        {
          name: 'Site1.2',
        },
      ],
    },
    {
      name: 'Site 2',
      children: [
        {
          name: 'Site1.1',
          children: [
            {
              name: 'Site1.1',
            },
            {
              name: 'Site1.2',
            },
          ],
        },
        {
          name: 'Site1.2',
          children: [
            {
              name: 'Site1.1',
            },
            {
              name: 'Site1.2',
            },
          ],
        },
      ],
    },
    {
      name: 'Site 2',
      children: [
        {
          name: 'Site1.1',
        },
        {
          name: 'Site1.2',
        },
      ],
    },
  ],
}

class Behavior extends React.Component {
  render() {
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Behavior" />
        <div className="custom-container">
          <Tree
            data={data}
            height={200}
            width={1300}
            svgProps={{
              className: 'custom'
            }}
          />
        </div>
      </Authorize>
    )
  }
}

export default Behavior
