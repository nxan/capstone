import React from 'react'
import LiveSearch from './LiveSearch'
import ProfileMenu from './ProfileMenu'
import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <div className="mr-auto">
          <LiveSearch />
        </div>
        {/* <div className="mr-4">
          <HomeMenu />
        </div> */}
        <ProfileMenu />
      </div>
    )
  }
}

export default TopBar
