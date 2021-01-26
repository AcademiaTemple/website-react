import React from 'react';
import ReactDOM from 'react-dom';
import TempleApp from './TempleApp';
//import "bootstrap/dist/js/bootstrap.min.js";
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/normalize.css';
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min";
import "@fortawesome/fontawesome-free/css/all.css";
import "plyr/dist/plyr.css";
import './styles/index.css';

ReactDOM.render(
  <TempleApp />,
  document.getElementById('root')
);
