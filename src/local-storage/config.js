/**
 * @module locale-storage/config
 */

export const localStoragePrefix = 'docket';

export const localStorageSeparator = '.';

export function key(...pieces) {
  return Array.from([localStoragePrefix, /*environment, */...pieces])
              .join(localStorageSeparator);
};
