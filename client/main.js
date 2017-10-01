import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch,withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';


import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

const browserHistory = createHistory();

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
   onAuthChange(isAuthenticated);
})

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    if(selectedNoteId) {
      browserHistory.replace(`/dashboard/${selectedNoteId}`);
    }
})



Meteor.startup(() => {
  Session.set('selectedNoteId',undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
