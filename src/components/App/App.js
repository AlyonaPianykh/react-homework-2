import React from 'react';
import {UserPage} from '../../containers/UserPage/UserPage';
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route, Redirect} from 'react-router';

import './App.css';
import {NotFoundPage} from "../NotFoundPage/NotFoundPage";
import {PostsDetailsPage} from "../../containers/PostsDetailsPage/PostsDetailsPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Redirect exact from='/' to='/users'/>
                    <Route exact path="/users" component={UserPage}/>

                    <Route exact path="/posts/:id" component={PostsDetailsPage}/>

                    <Route exact path="/not-found" component={NotFoundPage}/>
                    <Redirect from='*' to='/not-found'/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
