import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { makeSelectCap } from '../Cap/selectors';
import messages from './messages';
import config from '../../config/app';
import LoginForm from '../../components/LoginForm';
import * as actions from '../Cap/actions';
import loaderGif from '../../assets/loading_img.gif';
import sagas from '../Cap/saga';
import injectSaga from '../../utils/injectSaga';

const logo = require('./assets/images/capillary_logo.png');

export class Login extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isLoginError: false,
    };
  }

  componentWillMount() {
    const isAuthenticated = this.props.Login.token !== '';
    const { push } = this.props.history;
    if (
      this.props.Login.login_progress === false &&
      this.props.Login.fetching_userdata === false &&
      isAuthenticated
    ) {
      push(
        process.env.NODE_ENV === 'production'
          ? config.production.dashboard_url
          : config.development.dashboard_url,
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const isAuthenticated =
      nextProps.Login.token !== undefined && nextProps.Login.token !== '';
    const wasAuthenticated =
      this.props.Login.token !== undefined && this.props.Login.token !== '';
    if (this.props.Login && this.props.Login.isError) {
      this.setState({ isLoginError: true });
    } else {
      this.setState({ isLoginError: false });
    }

    if (!wasAuthenticated && isAuthenticated) {
      let redirectUrl =
        process.env.NODE_ENV === 'production'
          ? config.production.dashboard_url
          : config.development.dashboard_url;
      const locationHelper = locationHelperBuilder({});
      const redirect = locationHelper.getRedirectQueryParam(this.props);
      if (redirect) redirectUrl = redirect;
      this.props.history.push(redirectUrl);
      // this.props.router.go(redirectUrl);
    }
  }

  render() {
    const loginProgress = this.props.Login.login_progress;
    return (
      <div
        className={this.props.Login.fetching_userdata ? 'opacity-class' : ''}
      >
        <FormattedMessage {...messages.pageTitle}>
          {message => (
            <Helmet
              title={message}
              meta={[{ name: 'description', content: 'Login Page' }]}
            />
          )}
        </FormattedMessage>
        <Row
          align="middle"
          justify="center"
          type="flex"
          className="login-container"
        >
          {process.env.NODE_ENV === 'production' ? (
            <div className="cap-loader-box">
              <img className="loader-image" src={loaderGif} alt="Capillary" />
            </div>
          ) : (
            <Col className="login-box" style={{ textAlign: 'center' }}>
              <h2 className="ui image header">
                <img alt="" src={logo} className="login-logo" />
              </h2>
              <LoginForm
                isError={this.state.isLoginError}
                authenticate={this.props.actions.authenticate}
                loginInProgress={loginProgress}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  Login: PropTypes.object,
  login_progress: PropTypes.bool,
  location: PropTypes.object,
  router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectCap(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

export default compose.apply(null, [...withSaga, withConnect])(
  injectIntl(withRouter(Login)),
);
