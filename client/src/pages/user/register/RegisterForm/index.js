import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const FormItem = Form.Item
@connect(({ user }) => ({ user }))
class RegisterFormComponent extends React.Component {
  state = {
    confirmDirty: false,
  }

  componentDidMount = ()=>{
    const {form, shop} = this.props
    console.log(shop)
    form.setFieldsValue({
      shop
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    const { confirmDirty } = this.state
    this.setState({
      confirmDirty: confirmDirty || !!value,
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { form, dispatch, code, hmac, stateShop } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/REGISTER',
          payload: {
            values,
            code,
            hmac,
            stateShop
          },
        })
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const {
      form
    } = this.props
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem validateStatus="validating">
          {form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </FormItem>
        <FormItem validateStatus="validating">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your Name"
            />,
          )}
        </FormItem>
        <FormItem validateStatus="validating">
          {form.getFieldDecorator('shopName', {
            rules: [{ required: true, message: 'Please input your shop name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Shop Name"
            />,
          )}
        </FormItem>
        <FormItem>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Input your password"
            />,
          )}
        </FormItem>
        <FormItem>
          {form.getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              onBlur={this.handleConfirmBlur}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Confirm your password"
            />,
          )}
        </FormItem>
        <FormItem validateStatus="validating">
          {form.getFieldDecorator('shop', {
            rules: [{ required: true, message: 'Please input your shop!' }],
          })(
            <Input
              prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Shop URL"
              disabled
            />,
          )}
        </FormItem>

        <div className="form-actions">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
          <span className="ml-3 register-link">
            Back to {' '}
            <Link
              to="/user/login"
              className="utils__link--blue utils__link--underlined"
            >
              Login
            </Link>
          </span>
        </div>
      </Form>
    )
  }
}

const RegisterForm = Form.create()(RegisterFormComponent)
export default RegisterForm