/**
 * @module components/ForgotPassword
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import withQueryParams from '../QueryParams/QueryParams'
import { userActions } from '../../actions';
import styles from './styles'

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      newPasswordConfirmation: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { resetPassword, queryParams } = this.props;
    const { newPassword, newPasswordConfirmation } = this.state;
    resetPassword(queryParams.code, newPassword, newPasswordConfirmation);
  }

  render() {
    const { t, classes } = this.props;
    const isDisabled = !this.state.newPassword || !this.state.newPasswordConfirmation

    return (
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper className={classes.root}>
            <Box p={4}>
              <Typography variant="h6" className={classes.title}>{t('resetPassword')}</Typography>
              <form action="" onSubmit={this.onSubmit}>
                <Grid container alignContent="center" alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="new-password"
                      name="newPassword"
                      label={t('newPassword')}
                      type="password"
                      margin="normal"
                      autoFocus={true}
                      helperText={t('passwordHelperText')}
                      value={this.state.newPassword}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="new-password-confirmation"
                      name="newPasswordConfirmation"
                      label={t('confirmNewPassword')}
                      type="password"
                      margin="normal"
                      value={this.state.newPasswordConfirmation}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('resetPassword')}</Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    )
  }


}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (code, password, passwordConfirmation) => dispatch(userActions.resetPassword(code, password, passwordConfirmation))
  }
}

export default compose(
  withTranslation(),
  withQueryParams,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ResetPassword);
