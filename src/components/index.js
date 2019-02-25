/**
 * @module components
 */

/**********************************/
/* Keep these lists alphabetized! */
/**********************************/

import App from './App/App';
import AppRouter from './AppRouter/AppRouter';
import AuthenticatedRoute from './AuthenticatedRoute/AuthenticatedRoute';
import EventDetail from './EventDetail/EventDetail';
import EventListItem from './EventListItem/EventListItem';
import EventsList from './EventsList/EventsList';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import GlobalError from './GlobalError/GlobalError';
import GoogleCalendarsList from './GoogleCalendarsList/GoogleCalendarsList';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Navbar from './Navbar/Navbar';
import NewEvent from './NewEvent/NewEvent';
import NewUser from './NewUser/NewUser'; // @todo Register
import NewUserSuccess from './NewUserSuccess/NewUserSuccess'; // @todo RegistrationSuccess
import OAuthGoogleCallback from './OAuthGoogleCallback/OAuthGoogleCallback';
import OAuthMicrosoftCallback from './OAuthMicrosoftCallback/OAuthMicrosoftCallback';
import Profile from './Profile/Profile';
import QueryParams from './QueryParams/QueryParams';
import RegistrationConfirmation from './RegistrationConfirmation/RegistrationConfirmation';
import UnauthenticatedRoute from './UnauthenticatedRoute/UnauthenticatedRoute';

export {
  App,
  AppRouter,
  AuthenticatedRoute,
  EventDetail,
  EventListItem,
  EventsList,
  ForgotPassword,
  ResetPassword,
  GlobalError,
  GoogleCalendarsList,
  Login,
  Logout,
  Navbar,
  NewEvent,
  NewUser,
  NewUserSuccess,
  OAuthGoogleCallback,
  OAuthMicrosoftCallback,
  Profile,
  QueryParams,
  RegistrationConfirmation,
  UnauthenticatedRoute
}
