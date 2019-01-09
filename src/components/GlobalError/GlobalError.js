/**
 * @module components/GlobalError
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { errorActions } from '../../actions';

class GlobalError extends Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.props.dispatch(errorActions.closed());
  }

  handleExited() {
    this.props.dispatch(errorActions.dequeued());
  }

  render() {
    // const { classes, errors } = this.props;
    return (
      <div></div>
      // <div>Error</div>
      // <Snackbar
      //   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      //   open={errors.isOpen}
      //   onClose={this.handleClose}
      //   onExited={this.handleExited}
      //   ContentProps={{
      //     'aria-describedby': 'message-id',
      //   }}
      //   message={<span id="message-id">{errors.all.length && errors.all[0].hasOwnProperty('message') ? errors.all[0].message.text : ''}</span>}
      //   autoHideDuration={errors.all.length && errors.all[0].autoHide ? errors.all[0].autoHideDuration : null}
      //   action={[
      //     <IconButton
      //       key="close"
      //       aria-label="Close"
      //       color="inherit"
      //       className={classes.close}
      //       onClick={this.handleClose}
      //     >
      //       <CloseIcon />
      //     </IconButton>
      //   ]}
      // />
    );
  }

}

GlobalError.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default compose(
  // withStyles(styles),
  connect(mapStateToProps)
)(GlobalError);
