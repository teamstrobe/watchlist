import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import AppFlux from './flux';
import SearchBox from './components/SearchBox';
if(__DEV__) var Perf = require('react-addons-perf');
import 'babel/polyfill';

let flux = new AppFlux();
var host = document.getElementById('host');

if(__DEV__) Perf.start();
ReactDOM.render(React.createElement(AppContainer, {flux: flux}), host);
if(__DEV__) window.Perf = Perf;
