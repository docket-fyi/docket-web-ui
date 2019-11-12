/**
 * @module components/ForgotPassword
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { compose } from 'redux';
import PropTypes from 'prop-types';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import { withTranslation } from 'react-i18next';

import { userActions } from '../../actions';
import styles from './styles';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { forgotPassword } = this.props;
    const { email } = this.state;
    forgotPassword(email);
  }

  render() {
    const { classes, t } = this.props;

    return (
      <Grid container item justify="center" spacing={0} xs={4}>
        <Grid container item xs={12}>
          <Link component={RouterLink} to="/login" variant="button" underline="none">
              <LeftIcon size="small"/> {t('back')}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box p={4}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h1" className={classes.title}>{t('forgotPassword')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <form action="" onSubmit={this.onSubmit}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          margin="normal"
                          autoFocus={true}
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth type="submit" variant="contained" color="primary">{t('submit')}</Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    )
  }

}

ForgotPassword.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: email => dispatch(userActions.forgotPassword(email))
  }
}

export default compose(
  withStyles(styles),
  withTranslation(),
  connect(null, mapDispatchToProps)
)(ForgotPassword);
