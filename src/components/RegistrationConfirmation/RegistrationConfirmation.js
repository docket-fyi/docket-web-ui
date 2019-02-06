/**
 * @module components/RegistrationConfirmation
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import { userActions } from '../../actions';
import './RegistrationConfirmation.css'

class RegistrationConfirmation extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { code } = match.params;
    dispatch(userActions.confirm(code));
  }

  render() {
    const { t } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            {t('loading')}
          </Col>
        </Row>
      </Container>
    )
  }

}

RegistrationConfirmation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(RegistrationConfirmation);

