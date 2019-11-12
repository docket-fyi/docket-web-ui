/**
 * @module components/Navbar
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { meActions, googleActions, microsoftActions } from '../../actions';
import history from '../../history';
import './Navbar.css'
// import googleLogo from './google-logo.png'
import googleCalendarLogo from './google-calendar-logo.png'
import microsoftOutlookLogo from './microsoft-outlook-logo.png'
import routes from '../../routes'

class Navbar2 extends Component {

  constructor(props) {
    super(props);
    this.onBrandClick = this.onBrandClick.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.onGoogleCalendarClick = this.onGoogleCalendarClick.bind(this);
    this.onMicrosoftOutlookClick = this.onMicrosoftOutlookClick.bind(this);
  }

  goToProfile(event) {
    event.preventDefault();
    history.push(routes.profile);
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
    history.push(routes.events.list)
  }

  onGoogleCalendarClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(googleActions.getAuthUrl());
  }

  onMicrosoftOutlookClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(microsoftActions.getAuthUrl())
  }

  render() {
    const { t } = this.props;

    return (
      <div expand="lg">
        {/* <Navbar.Brand as="button" onClick={this.onBrandClick}>Docket</Navbar.Brand> */}
        <button variant="link" className="navbar-brand" onClick={this.onBrandClick}>Docket</button>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <form className="ml-auto" inline>
            <input size="lg" type="text" placeholder={t('search')} className="mr-sm-2" />
            {/* <Button variant="outline-success">{t('search')}</Button> */}
          </form>
          <div className="ml-auto">
            <button variant="link" onClick={this.onGoogleCalendarClick}>
              <img src={googleCalendarLogo} height="30" width="30" />
            </button>
            <button variant="link" onClick={this.onMicrosoftOutlookClick}>
              <img src={microsoftOutlookLogo} height="30" width="30" />
            </button>
            {/* <NavDropdown title={this.getInitials()} id="basic-nav-dropdown"> */}
              {/* <NavDropdown.Item onClick={this.goToProfile}>{t('profile')}</NavDropdown.Item> */}
              {/* <Button variant="primary" onClick={this.onBrandClick}>Docket</Button> */}
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="/logout">{t('logout')}</NavDropdown.Item> */}
            {/* </NavDropdown> */}
          </div>
        {/* </Navbar.Collapse> */}
      </div>
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
  withTranslation(),
  connect(mapStateToProps)
)(Navbar2);
