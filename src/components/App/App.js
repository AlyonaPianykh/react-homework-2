import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {UserPage} from '../../containers/UserPage/UserPage';
import {PostDetailsPage} from "../../containers/PostDetailsPage/PostDetailsPage";
import {NotFoundPage} from "../../containers/NotFoundPage/NotFoundPage";
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/users"/>
                <Route exact path="/users">
                    <div className="App">
                        <UserPage/>
                    </div>
                </Route>
                <Route path="/posts/:id">
                    <PostDetailsPage />
                </Route>
                <Route exact path="/not-found">
                    <NotFoundPage/>
                </Route>
                <Redirect exact from="*" to="/not-found"/>
            </Switch>
        </Router>
    );
}

export default App;
