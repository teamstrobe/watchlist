import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import AppFlux from './flux';
import SearchBox from './components/SearchBox';

import 'babel/polyfill';

let flux = new AppFlux();
var host = document.getElementById('host');

ReactDOM.render(React.createElement(AppContainer, {flux: flux}), host);
