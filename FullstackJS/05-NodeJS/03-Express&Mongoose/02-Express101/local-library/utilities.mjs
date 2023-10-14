/** @returns {never} */
export function raise(/** @type {string} */ msg) {
  throw new Error(msg);
}
