/**
 * @module routes
 */

const routes = {
  login: '/login',
  logout: '/logout',
  events: '/events',
  eventDetail: id => `/events/${id}`,
  profile: '/profile',
  newEvent: '/events/new'
}

export default routes;
