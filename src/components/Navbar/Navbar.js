/**
 * @module components/Navbar
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Image,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'

import { meActions, googleActions } from '../../actions';
import history from '../../history';
import './Navbar.css'
// import googleLogo from './google-logo.png'
import googleCalendarLogo from './google-calendar-logo.png'

class Navbar2 extends Component {

  constructor(props) {
    super(props);
    this.onBrandClick = this.onBrandClick.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.onGoogleCalendarClick = this.onGoogleCalendarClick.bind(this);
  }

  goToProfile(event) {
    event.preventDefault();
    history.push('/profile');
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(meActions.getProfile())
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

  onGoogleCalendarClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(googleActions.getAuthUrl())
  }

  render() {
    return (
      <Navbar expand="lg">
        {/* <Navbar.Brand as="button" onClick={this.onBrandClick}>Docket</Navbar.Brand> */}
        <Button variant="link" className="navbar-brand" onClick={this.onBrandClick}>Docket</Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="ml-auto" inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
          <Nav className="ml-auto">
            <Button variant="link" onClick={this.onGoogleCalendarClick}>
              <Image src={googleCalendarLogo} height="30" width="30" />
            </Button>
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
