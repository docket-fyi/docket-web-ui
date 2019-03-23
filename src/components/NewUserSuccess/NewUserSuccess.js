/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import './NewUserSuccess.css'

class NewUserSuccess extends Component {

  componentDidUpdate() {
    const { user, history } = this.props;
    if (!user.email || !user.firstName) {
      history.push('/register');
      return;
    }
  }

  render() {
    const { t, user } = this.props;
    const { firstName, email } = user;

    return (
      // (user.email && user.firstName) ? <Container> : null
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            {t('thanksForRegistering', {firstName, email})}
          </Col>
        </Row>
      </Container>
    )
  }


}

NewUserSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(NewUserSuccess);

