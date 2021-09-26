import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/admin" component={Dashboard} />           
            <PrivateRoute exact path="/logout" component={Logout} />
        </Switch>
    </Router>
);

export default Routes;