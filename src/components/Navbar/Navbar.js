/**
 * @module components/Navbar
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap'

import history from '../../history';
import './Navbar.css'

class Navbar2 extends Component {

  constructor(props) {
    super(props);
    this.onBrandClick = this.onBrandClick.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  goToProfile(event) {
    event.preventDefault();
    history.push('/profile');
  }

  getInitials() {
    const { me } = this.props;
    const { firstName = '', lastName = '' } = me
    return `${firstName[0]}${lastName[0]}`
  }

  onBrandClick(event) {
    event.preventDefault();
    history.push('/events')
  }

  render() {
    return (
      <Navbar expand="lg">
        {/* <Navbar.Brand as="button" onClick={this.onBrandClick}>Docket</Navbar.Brand> */}
        <Button variant="primary" onClick={this.onBrandClick}>Docket</Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="ml-auto" inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
          <Nav className="ml-auto">
            <NavDropdown title={this.getInitials()} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.goToProfile}>Profile</NavDropdown.Item>
              {/* <Button variant="primary" onClick={this.onBrandClick}>Docket</Button> */}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

Navbar2.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    me: state.me
  }
}

export default compose(
  // withRouter,
  connect(mapStateToProps)
)(Navbar2);
