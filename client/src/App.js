import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertComponent } from './components/Alert';

import Navbar from './components/Navbar';
import Log from './components/Log';

function App() {
  return (
    <Router>
    <AlertComponent>
      <Navbar />
      <Log />
    </AlertComponent>
    </Router>
  );
}

export default App;
