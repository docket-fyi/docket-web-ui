/**
 * @module components/RegistrationConfirmation
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import withQueryParams from '../QueryParams/QueryParams'
import { userActions } from '../../actions';
import styles from './styles'

class RegistrationConfirmation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { confirmRegistration, queryParams } = this.props;
    const { password, passwordConfirmation } = this.state;
    confirmRegistration(queryParams.code, password, passwordConfirmation);
  }

  render() {
    const { t, classes } = this.props;
    const isDisabled = !this.state.password || !this.state.passwordConfirmation

    return (
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper>
            <Box p={4}>
              <Typography variant="h6" className={classes.title}>{t('confirmRegistration')}</Typography>
              <form action="" onSubmit={this.onSubmit}>
                <Grid container alignContent="center" alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label={t('password')}
                      type="password"
                      margin="normal"
                      autoFocus={true}
                      helperText={t('passwordHelperText')}
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password-confirmation"
                      name="passwordConfirmation"
                      label={t('passwordConfirmation')}
                      type="password"
                      margin="normal"
                      value={this.state.passwordConfirmation}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" disabled={isDisabled} color="primary">
                      {t('setPassword')}
                    </Button>
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

RegistrationConfirmation.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  confirmRegistration: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    confirmRegistration: (code, password, passwordConfirmation) => dispatch(userActions.confirm(code, password, passwordConfirmation))
  }
}

export default compose(
  withTranslation(),
  withStyles(styles),
  withQueryParams,
  connect(null, mapDispatchToProps)
)(RegistrationConfirmation);
