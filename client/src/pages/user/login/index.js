import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {
  onSubmit = event => {
    event.preventDefault()
    const params = new URLSearchParams(window.location.search)
    const shop = params.get('shop')
    const code = params.get('code')
    const hmac = params.get('hmac')
    const installed = params.get('installed')
    const stateShop = params.get('state')
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        if (shop && code && hmac && stateShop) {
          values.shop = shop
          values.code = code
          values.hmac = hmac
          values.stateShop = stateShop
          values.installed = installed
        }
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      form,
      user: { fetching },
    } = this.props
    return (
      <div>
        <Helmet title="Login" />
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
                    <strong>Please log in</strong>
                  </h4>
                  <br />
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="Email">
                      {form.getFieldDecorator('email', {
                        initialValue: 'nxan.developer@gmail.com',
                        rules: [{ required: true, message: 'Please input your e-mail address' }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {form.getFieldDecorator('password', {
                        initialValue: 'nxan.developer@gmail.com',
                        rules: [{ required: true, message: 'Please input your password' }],
                      })(<Input size="default" type="password" />)}
                    </Form.Item>
                    <Form.Item>
                      {form.getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(<Checkbox>Remember me</Checkbox>)}
                      <a>
                        <Link
                          to="/user/forgot"
                          className="utils__link--blue utils__link--underlined pull-right"
                        >
                          Forgot password?
                        </Link>
                      </a>
                    </Form.Item>
                    <div className="form-actions">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={fetching}
                      >
                        Login
                      </Button>
                      <span className="ml-3 register-link">
                        <Link
                          to="/user/register"
                          className="utils__link--blue utils__link--underlined pull-right"
                        >
                          Register
                        </Link>{' '}
                        if you don&#39;t have account
                      </span>
                    </div>
                    <div className="form-group">
                      <p>Use another service to Log In</p>
                      <div className="mt-2">
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-facebook" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-google" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-windows" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-twitter" />
                        </a>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
