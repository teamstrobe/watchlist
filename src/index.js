import React from 'react';
import AppContainer from './components/AppContainer';
import AppFlux from './flux';
import SearchBox from './components/SearchBox';

import 'babel/polyfill';

React.initializeTouchEvents(true);

let flux = new AppFlux();
var host = document.getElementById('host');

React.render(React.createElement(AppContainer, {flux: flux}), host);
