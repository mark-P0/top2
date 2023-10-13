/** @typedef {import('express').RequestHandler} RequestHandler */

/** @returns {RequestHandler} */
export function withNextError(/** @type {RequestHandler} */ fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
