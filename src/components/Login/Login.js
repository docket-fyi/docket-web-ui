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
  withStyles
} from '@material-ui/core';

import routes from '../../routes'
import { authenticationActions } from '../../actions';
import { hasJwt, isJwtExpired } from '../../local-storage/jwt';
import styles from './styles'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
    const { authenticate } = this.props;
    const { email, password } = this.state;
    authenticate(email, password);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onRegister(event) {
    this.props.history.push(routes.register);
  }

  onForgotPassword(event) {
    this.props.history.push(routes.forgotPassword);
  }

  render() {
    const { t, classes, authentication } = this.props;
    const isDisabled = authentication.isLoading || !this.state.email || !this.state.password

    return (
      <>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper>
              <Box p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h1" className={classes.title}>{ t('login') }</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <form action="" onSubmit={this.onSubmit}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label={t('email')}
                            margin="normal"
                            type="email"
                            autoFocus={true}
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label={t('password')}
                            type="password"
                            margin="normal"
                            value={this.state.password}
                            onChange={this.onChange}
                            InputProps={{
                              endAdornment: <Link component={RouterLink} to={routes.forgotPassword} underline="none" variant="button">{t('forgot')}</Link>
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button fullWidth type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('login')}</Button>
                        </Grid>
                        <Grid item xs={12}>
                        <Link component={RouterLink} to={routes.register}>{t('register')}</Link>
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

Login.propTypes = {
  history: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (email, password) => dispatch(authenticationActions.authenticate(email, password))
  }
}

export default compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
