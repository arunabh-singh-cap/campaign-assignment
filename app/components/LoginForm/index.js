import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class LoginForm extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoginError) {
      this.setState({ username: '', password: '' });
    }
  }

  login(event) {
    event.preventDefault();
    const formData = {
      username: this.state.username,
      password: this.state.password,
    };
    event.preventDefault();
    this.props.authenticate(formData);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.username}>
          {message => (
            <Input
              type="text"
              name="username"
              placeholder={message}
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.password}>
          {message => (
            <Input
              type="password"
              name="password"
              placeholder={message}
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          )}
        </FormattedMessage>
        <Button
          loading={this.props.loginInProgress}
          disabled={this.props.loginInProgress}
          onClick={this.login}
        >
          {<FormattedMessage {...messages.loginButton} />}
        </Button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  authenticate: PropTypes.func.isRequired,
  loginInProgress: PropTypes.bool,
};

export default LoginForm;
