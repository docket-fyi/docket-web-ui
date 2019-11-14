/**
 * @module components/Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Link,
  Grid,
  Paper,
  TextField,
  Box,
  Typography,
  withStyles,
  Divider
} from '@material-ui/core';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

import { userActions } from '../../actions';
import { hasJwt, isJwtExpired } from '../../local-storage/jwt';
import routes from '../../routes'
import styles from './styles'
import history from '../../history'

class NewUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin() {
    history.push(routes.login)
  }

  componentDidMount() {
    if (hasJwt() && !isJwtExpired()) {
      this.props.history.push(routes.events.list);
      return;
    }
  }

  componentDidUpdate() {
    if (hasJwt() && !isJwtExpired()) {
      this.props.history.push(routes.events.list);
      return;
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { register } = this.props;
    const { firstName, email } = this.state;
    register(firstName, email);
  }

  render() {
    const { t, classes } = this.props;
    const isDisabled = !this.state.firstName || !this.state.email // || this.props.something.isLoading

    return (
      <>
        <Grid container item justify="center" spacing={0} xs={4}>
          <Grid container item xs={12}>
            <Button className={classes.button} startIcon={<LeftIcon />} onClick={this.goToLogin}>{t('login')}</Button>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h1" className={classes.title}>{ t('register') }</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <form action="" onSubmit={this.onSubmit}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label={t('firstName')}
                            margin="normal"
                            autoFocus={true}
                            value={this.state.firstName}
                            onChange={this.onChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label={t('email')}
                            type="email"
                            margin="normal"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button fullWidth type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('register')}</Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider style={{marginTop: 10, marginBottom: 10}} />
                        </Grid>
                        <Grid item xs={12}>
                          <Button fullWidth variant="contained" color="primary">{t('google')}</Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button fullWidth variant="contained" color="primary">{t('microsoft')}</Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <Box p={3}>
              <Grid container align="center">
                <Grid item xs={6}>
                  <Link component={RouterLink} to={routes.privacyPolicy}>{t('privacyPolicy')}</Link>
                </Grid>
                <Grid item xs={6}>
                  <Link component={RouterLink} to={routes.termsOfUse}>{t('termsOfUse')}</Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </>
    )
  }


}

NewUser.propTypes = {
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    register: (firstName, email) => dispatch(userActions.register(firstName, email))
  }
}

export default compose(
  withTranslation(),
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(NewUser);
