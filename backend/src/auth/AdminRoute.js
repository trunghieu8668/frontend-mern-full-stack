import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../models/auth/api'
const AdminRoute = ({component: Component, ...rest}) => (
        <Route { ...rest } render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <Component {...props} />
        ): (
            <Redirect to={{pathname: '/admin', state:{from: props.location} }}/>
        )} />
);

export default AdminRoute;