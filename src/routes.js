/**
 * @module routes
 */

const routes = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  confirmRegistration: '/confirm-registration',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  privacyPolicy: '/privacy-policy',
  termsOfUse: '/terms-of-use',
  events: {
    list: '/events',
    show: (id, slug) => `/events/${id}/${slug}`,
    new: '/events/new'
  },
  profile: '/profile',
  google: {
    calendars: {
      list: '/google/calendars'
    }
  },
  microsoft: {
    calendars: {
      list: '/microsoft/calendars'
    }
  }
}

export default routes;
