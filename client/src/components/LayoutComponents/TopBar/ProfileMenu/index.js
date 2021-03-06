import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  state = {
    count: 0,
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  // addCount = () => {
  //   let { count } = this.state
  //   count += 1
  //   this.setState({
  //     count,
  //   })
  // }

  render() {
    const { user } = this.props
    const { count } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />, {user.name || 'Anonymous'}
          </strong>
          <div>
            <strong className="mr-1">
              <FormattedMessage id="topBar.profileMenu.shopName" />:{' '}
            </strong>
            {user.shopName}
          </div>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.shopUrl" />:{' '}
            </strong>
            {user.shopUrl}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.email" />:{' '}
            </strong>
            {user.email}
            <br />
            <strong>
              <FormattedMessage id="topBar.profileMenu.phone" />:{' '}
            </strong>
            {user.phone || '-'}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="/#/profile">
            <i className={`${styles.menuIcon} icmn-user`} />
            <FormattedMessage id="topBar.profileMenu.editProfile" />
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.logout}>
            <i className={`${styles.menuIcon} icmn-exit`} />
            <FormattedMessage id="topBar.profileMenu.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
