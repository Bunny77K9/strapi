'use strict';

const { propOr } = require('lodash/fp');

const getMiddlewareConfig = propOr([], 'config.middlewares');

const resolveMiddlewares = route => {
  const middlewaresConfig = getMiddlewareConfig(route);

  return middlewaresConfig.map(middlewareConfig => {
    if (typeof middlewareConfig === 'function') {
      return middlewareConfig;
    }

    // TODO: this won't work until we have the new middleware formats
    const middleware = strapi.middleware(middlewareConfig);

    if (!middleware) {
      throw new Error(`Middleware ${middlewareConfig} not found.`);
    }

    return middleware;
  });
};

module.exports = {
  resolveMiddlewares,
};