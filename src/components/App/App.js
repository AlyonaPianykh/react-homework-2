import React from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import logo from '../../logo.svg';
import { UserPage } from '../../containers/UserPage/UserPage';

import './App.css';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <UserPage />
          </div>
      </BrowserRouter>

  );
}

export default App;
