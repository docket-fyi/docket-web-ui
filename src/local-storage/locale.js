/**
 * @module local-storage/locale
 */

import { key } from './config';

export const LOCALE_KEY = key('locale');

/**
 * [getLocale description]
 * @return {Null|String} [description]
 */
export function getLocale() {
  return localStorage.getItem(LOCALE_KEY);
}

export function getNavigatorLanguage() {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}

/**
 * [setLocale description]
 * @return {Null|String} [description]
 */
export function setLocale(locale) {
  /**
   * Note that try/catch is required because setItem() can throw
   * in some browsers:
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
   */
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch (err) {
    // TODO
    console.error('setLocale():', err);
  }
}

/**
 * [removeLocale description]
 * @return {undefined} [description]
 */
export function removeLocale() {
  localStorage.removeItem(LOCALE_KEY);
}

/**
 * [locale description]
 * @return {Null|String} [description]
 */
export function locale() {
  if (!hasLocale()) return null;
  return getLocale();
}

/**
 * [hasLocale description]
 * @return {Boolean} [description]
 */
export function hasLocale() {
  return !!getLocale();
}