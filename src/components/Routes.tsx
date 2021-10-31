import React, { Component, FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch as useAppDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logUserOut } from '../redux/auth/slices/authSlice';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';

interface IPrivateRoute {
    component: any;
    exact: boolean;
    path: string;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
    const dispatch = useAppDispatch();
    const { loggedIn, token } = useSelector((state: any) => state.auth);
    const isAuthenticated = () => {
        if (!loggedIn) return false;
        if (!token) dispatch(logUserOut());
        return loggedIn;
    };
    return <Route {...rest} render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

const Routes = () => {
    const { loggedIn, token } = useSelector((state: RootState) => state.auth);
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/login">
                {loggedIn || token ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/register">
                {loggedIn || token ? <Redirect to="/" /> : <Register />}
            </Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;
