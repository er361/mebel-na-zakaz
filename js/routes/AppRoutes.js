import React from 'react';
import {Route, IndexRoute} from 'react-router';

import AdminContainer from '../components/admin/App';
import ClientContainer from '../components/client/App';
import Content from '../components/client/Content';
import AdminViewerQuery from '../queries/AdminViewerQuery';

export default (
  <Route path='/' component={ClientContainer} >
    <IndexRoute component={Content} queries={AdminViewerQuery} />
    <Route path='admin' component={AdminContainer} queries={AdminViewerQuery} />
  </Route>

)
