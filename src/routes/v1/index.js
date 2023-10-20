const express = require('express');
const accountsRoute = require('./accounts');
const fxRoute = require('./fx');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/accounts',
    route: accountsRoute,
  },
  {
    path: '/fx',
    route: fxRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;