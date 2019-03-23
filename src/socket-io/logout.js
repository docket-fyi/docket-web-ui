import { authenticationActions } from '../actions';

function logout(dispatch, data) {
  dispatch(authenticationActions.logout())
}

export default logout;
