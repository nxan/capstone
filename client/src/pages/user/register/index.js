import React from 'react'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import RegisterForm from './RegisterForm'

class Register extends React.Component {
  
  render() {
    const params = new URLSearchParams(window.location.search)
    const shop = params.get('shop')
    const code = params.get('code')
    const hmac = params.get('hmac')
    const stateShop = params.get('state')    
    return (
      <div>
        <Helmet title="Register" />
        <div className={`${styles.title} login-heading`}>
          <h1>
            <strong>WELCOME TO SHOPIFY ANALYTICS</strong>
          </h1>
          <p>
            Shopify analytics and reports give you the means to review your store recent activity,
            <br />
            get insight into your visitors, and analyze your store transactions.
            <br />
            Best of all, you get this functionality for free! Contact: - <strong>admin@shopify.com</strong>{' '}
          </p>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong>Please register</strong>
                  </h4>
                  <br />
                  <RegisterForm 
                  shop={shop} 
                  code={code}
                  hmac={hmac}
                  stateShop={stateShop}                  
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register