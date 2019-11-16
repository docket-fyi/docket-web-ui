/**
 * @module components/Navbar
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Grid,
  withStyles,
  Typography,
  InputBase,
  Button
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { meActions, googleActions, microsoftActions, searchActions } from '../../actions';
import history from '../../history';
import './Navbar.css'
// import googleLogo from './google-logo.png'
// import googleCalendarLogo from './google-calendar-logo.png'
// import microsoftOutlookLogo from './microsoft-outlook-logo.png'
import routes from '../../routes'
import styles from './styles'

class Navbar2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openMenu: false
    }
    this.onBrandClick = this.onBrandClick.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.onGoogleCalendarClick = this.onGoogleCalendarClick.bind(this);
    this.onMicrosoftOutlookClick = this.onMicrosoftOutlookClick.bind(this);

    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goToLogout = this.goToLogout.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.onUpgradeClick = this.onUpgradeClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  goToProfile(event) {
    event.preventDefault();
    history.push(routes.profile);
    this.handleClose()
  }

  componentDidMount() {
    const { getProfile } = this.props
    getProfile()
  }

  onBrandClick(event) {
    event.preventDefault();
    history.push(routes.events.list)
  }

  onGoogleCalendarClick(event) {
    event.preventDefault();
    const { getGoogleAuthUrl } = this.props;
    getGoogleAuthUrl()
  }

  onMicrosoftOutlookClick(event) {
    event.preventDefault();
    const { getMicrosoftAuthUrl } = this.props;
    getMicrosoftAuthUrl()
  }

  goToLogout() {
    history.push(routes.logout);
  }

  handleProfileMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  onUpgradeClick() {}

  onSearch(event) {
    event.preventDefault()
    const { performSearch } = this.props
    const formData = new window.FormData(event.target);
    const query = formData.get('query')
    performSearch(query)
  }

  render() {
    const { t, classes, me } = this.props;
    const profileMenuOpen = Boolean(this.state.anchorEl);
    const notification = {
      all: [{}]
    }

    return (
      <>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <Grid container alignItems="center" spacing={1} justify="space-between">
              <Grid container item alignItems="center" xs={4}>
                <Typography variant="h6" className={classes.title}>Docket</Typography>
              </Grid>
              <form action="" onSubmit={this.onSearch} className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={t('searchEllipsis')}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  id="query"
                  name="query"
                  inputProps={{ 'aria-label': t('search') }}
                />
              </form>
              <Grid container item xs={4} justify="flex-end">
                {
                  !(me.attributes || {}).isPremium &&
                  <Button color="secondary" onClick={this.onUpgradeClick}>{t('upgrade')}</Button>
                }
                <IconButton color="inherit">
                  <Badge badgeContent={notification.all.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={profileMenuOpen ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  {/* <Avatar className={classes.avatar}>{(me.attributes || {}).initials}</Avatar> */}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={profileMenuOpen}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.goToProfile}>{t('profile')}</MenuItem>
                  <MenuItem onClick={this.goToLogout}>{t('logout')}</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
      </>
    );
  }

}

Navbar2.propTypes = {
  performSearch: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getGoogleAuthUrl: PropTypes.func.isRequired,
  getMicrosoftAuthUrl: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    me: state.me,
    search: state.search
  }
}

function mapDispatchToProps(dispatch) {
  return {
    performSearch: query => dispatch(searchActions.search(query)),
    getProfile: () => dispatch(meActions.getProfile()),
    getGoogleAuthUrl: () => dispatch(googleActions.getAuthUrl()),
    getMicrosoftAuthUrl: () => dispatch(microsoftActions.getAuthUrl())
  }
}

export default compose(
  // withRouter,
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar2);
