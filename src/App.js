import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Footer from './components/Footer/'
import Routes from './routes'

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
