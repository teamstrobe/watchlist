import React from 'react';
import AppContainer from './components/AppContainer';
import AppFlux from './flux';
import SearchBox from './components/SearchBox';

import 'babel/polyfill';

let flux = new AppFlux();
var host = document.getElementById('host');

React.render(React.createElement(AppContainer, {flux: flux}), host);

// React.render(React.createElement(SearchBox), host);
