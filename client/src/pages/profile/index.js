import React from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

@Form.create()
@connect(({ user }) => ({ user }))
class Profile extends React.Component {
  state = {
    confirmDirty: false,
  }

  componentDidMount = () => {
    const { form, user } = this.props;
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      shopUrl: user.shopUrl,
      shopName: user.shopName,
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props

    form.validateFields((error, values) => {
      console.log(values)
      if (!error) {
        dispatch({
          type: 'profile/EDIT',
          payload: values,
        })
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { form, user } = this.props
    return (
      <Authorize roles={['admin']}>
        <Helmet title="Profile" />
        <Form hideRequiredMark onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <strong>Email</strong>
              <div className="form-group">
                <FormItem>
                  {form.getFieldDecorator('email', {
                    rules: [],
                  })(<Input style={{fontWeight: 'bold',fontSize: 12}} disabled />)}
                </FormItem>

              </div>
            </div>
            <div className="col-md-6">
              <strong>Name</strong>
              <div className="form-group">
                <FormItem>
                  {form.getFieldDecorator('name', {
                    rules: [],
                  })(<Input placeholder="Name" />)}
                </FormItem>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <strong>Shop URL</strong>
              <div className="form-group">
                <FormItem>
                  {form.getFieldDecorator('shopUrl', {
                    rules: [],
                  })(<Input value={user.shopUrl} style={{fontWeight: 'bold',fontSize: 12}} disabled />)}
                </FormItem>
              </div>
            </div>
            <div className="col-md-6">
              <strong>Password</strong>
              <div className="form-group">
                <FormItem>
                  {form.getFieldDecorator('password', {
                    rules: [{ validator: this.validateToNextPassword, }],
                  })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Password" />)}
                </FormItem>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <strong>Shop Name</strong>
              <div className="form-group">
                <FormItem>
                  {form.getFieldDecorator('shopName', {
                    rules: [],
                  })(<Input value={user.shopName} style={{fontWeight: 'bold',fontSize: 12}} disabled />)}
                </FormItem>
              </div>
            </div>
            <div className="col-md-6">
              <strong>Re-Password</strong>
              <div className="form-group">
                <FormItem>
                  {form.getFieldDecorator('re-password', {
                    rules: [{ validator: this.compareToFirstPassword, }],
                  })(<Input.Password placeholder="Re-password" />)}
                </FormItem>
              </div>
            </div>
          </div>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Authorize>
    )
  }
}

export default Profile
