import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch,withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {Tracker} from 'meteor/tracker';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';



const browserHistory = createHistory();
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  const pathname=browserHistory.location.pathname;
  const isUnauthenticatedPage=unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage=authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if(isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
}



export const routes = (
  <Router history={browserHistory}>
  <div>
     <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/dashboard/:id" component={Dashboard}/>
        <Route component={NotFound}/>

     </Switch>
     </div>
    </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname=browserHistory.location.pathname;
  const isUnauthenticatedPage=unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage=authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if(isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
})

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
