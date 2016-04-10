import React from 'react';
import ReactDOM from 'react-dom';
import { RelayRouter } from 'react-router-relay';
import { browserHistory, Route, IndexRoute } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import '../node_modules/react-mdl/extra/material.js';
import '../node_modules/react-mdl/extra/material.min.css';

ReactDOM.render(
  <RelayRouter history={browserHistory} routes={AppRoutes} />,
   document.getElementById('root')
);
