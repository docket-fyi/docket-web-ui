/**
 * @module components/RegistrationConfirmation
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap'
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { userActions } from '../../actions';
import './RegistrationConfirmation.css'

class RegistrationConfirmation extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { code } = match.params;
    dispatch(userActions.confirm(code));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={{span: 4, offset: 4}}>
            Loading...
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
  connect(mapStateToProps)
)(RegistrationConfirmation);

