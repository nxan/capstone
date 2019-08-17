import React from 'react'
import styles from './style.module.scss'

class ShortItemInfo extends React.Component {
  render() {
    const { name, url, size } = this.props

    return (
      <div className={`${styles.item} ${size === 'large' ? styles.large : ''}`}>
        <div className={styles.description}>
          {name}
          {url && 
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="utils__link--blue utils__link--underlined"
          >
            <small>
              <i className="icmn-link ml-1" />
            </small>
          </a>}
        </div>
      </div>
    )
  }
}

export default ShortItemInfo
