import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import AppFlux from './flux';
import SearchBox from './components/SearchBox';
import Perf from 'react-addons-perf';

import 'babel/polyfill';

let flux = new AppFlux();
var host = document.getElementById('host');

Perf.start();
ReactDOM.render(React.createElement(AppContainer, {flux: flux}), host);


window.Perf = Perf;
