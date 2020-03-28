import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import logo from '../../logo.svg';
import { UserPage } from '../../containers/UserPage/UserPage';

import './App.css';
import { NotFoundPage } from "../../containers/NotFoundPage/NotFoundPage";
import { PostsDetailsPage } from "../../containers/PostsDetailsPage/PostsDetailsPage";
import {UserDetails} from "../UserDetails/UserDetails";


function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Redirect exact from='/' to='/users' />
                <Route exact path="/users">
                    <UserPage/>
                </Route>

                <Route exact path="/posts/:id" render ={(routeProps) => (<PostsDetailsPage {...routeProps}/>)} />

                <Route exact path="/not-found">
                    <NotFoundPage/>
                </Route>
                <Redirect from='*' to='/not-found' />

            </Switch>
        </Router>
    </div>
  );
}

export default App;
