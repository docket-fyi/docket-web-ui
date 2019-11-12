/**
 * @module routes
 */

const routes = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  registerSuccess: '/register/success',
  events: {
    list: '/events',
    show: (id, slug) => `/events/${id}/${slug}`,
    new: '/events/new'
  },
  profile: '/profile',
  forgotPassword: '/forgot-password',
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
