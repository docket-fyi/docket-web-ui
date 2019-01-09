/**
 * @module components/Profile
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

import { meActions } from '../../actions';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.me.firstName || '',
      lastName: props.me.lastName || '',
      email: props.me.email || '',
      createdAt: props.me.createdAt || new Date()
    }
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onDelete(event) {
    // event.preventDefault()
    const { dispatch } = this.props;
    dispatch(meActions.destroy());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(meActions.getProfile());
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props;
    const formData = new window.FormData(event.target);
    dispatch(meActions.update(formData));
  }

  render() {
    // const { firstName, lastName, email, createdAt = '' } = me;
    const { firstName, lastName, email, createdAt } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" value={lastName} onChange={this.onChange} placeholder="Last Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={email} onChange={this.onChange} placeholder="Email" />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        <h3>Member since { createdAt.toString() }</h3>
        <Button onClick={ this.onDelete }>Delete</Button>
      </Form>
    );
  }

}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    me: state.me
  }
}

export default compose(
  connect(mapStateToProps)
)(Profile);
