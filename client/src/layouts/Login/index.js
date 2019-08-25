import React from 'react'
import { Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styles from './style.module.scss'

@withRouter
class LoginLayout extends React.PureComponent {

  render() {
    const { children } = this.props
    return (
      <Layout>
        <Layout.Content>
          <div>
            <div className={styles.header}>
              <div className={styles.logo}>
                <Link to="/">
                  {(
                    <img src="/resources/images/logo.png" alt="Shopify Analytics" />
                  )}
                </Link>
              </div>
              <nav className={styles.navigation}>
                <ul className={styles.navigationItems}>
                  <li>
                    <a className={styles.navigationActive} href="javascript: void(0);">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0);">About</a>
                  </li>
                  <li>
                    <a href="javascript: void(0);">Support</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles.content}>{children}</div>
            <div className={`${styles.footer} text-center`}>
              <ul className="list-unstyled list-inline mb-3">
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Terms of Use</a>
                </li>
                <li className="active list-inline-item">
                  <a href="javascript: void(0);">Compliance</a>
                </li>
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Confidential Information</a>
                </li>
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Support</a>
                </li>
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Contacts</a>
                </li>
              </ul>
              <p>&copy; 2019 Shopify Analytics. All rights reserved.</p>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}

export default LoginLayout
