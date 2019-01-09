/**
 * @module util/localStorage
 */

import jwtDecode from 'jwt-decode';

// import environment from '../env';

const localStoragePrefix = 'docket'
const localStorageSeparator = '.';
const jwtPrefix = 'Bearer';

function key(...pieces) {
  return Array.from([localStoragePrefix, /*environment, */...pieces])
              .join(localStorageSeparator);
}

export const JWT_KEY = key('jwt');

/**
 * [jwt description]
 * @return {Null|String} [description]
 */
export function getJwt() {
  return localStorage.getItem(JWT_KEY);
}

/**
 * [jwt description]
 * @return {Null|String} [description]
 */
export function setJwt(jwt) {
  /**
   * Note that try/catch is required because setItem() can throw
   * in some browsers:
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
   */
  try {
    localStorage.setItem(JWT_KEY, jwt);
  } catch (err) {
    // TODO
    console.error('setJwt():', err);
  }
}

/**
 * [removeJwt description]
 * @return {undefined} [description]
 */
export function removeJwt() {
  localStorage.removeItem(JWT_KEY);
}

/**
 * [getJwt description]
 * @return {Null|String} [description]
 */
export function jwt(withPrefix = true) {
  if (!hasJwt()) return null;
  return withPrefix ? `${jwtPrefix} ${getJwt()}` : getJwt();
}

/**
 * [hasJwt description]
 * @return {Boolean} [description]
 */
export function hasJwt() {
  return !!getJwt();
}

/**
 * [isJwtExpired description]
 * @param  {[type]}  jwt [description]
 * @return {Boolean}     [description]
 */
export function isJwtExpired(jwt = getJwt()) { // eslint-disable-line no-use-before-define
  const { exp = 0 } = jwtDecode(jwt);
  const date = new Date();
  const currentTime = date.getTime() / 1000;
  if (currentTime > exp) {
    return true;
  }
  return false;
}
