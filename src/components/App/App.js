import React from 'react';
import UserPage from '../../containers/UserPage/UserPage';
import {PostPage} from "../../containers/PostPage/PostPage";
import {Redirect, Route, Switch} from "react-router-dom";
import { createStore } from 'redux'
import HomePage from "../../containers/HomePage/HomePage";
import './App.css';
import {NotFoundPage} from "../../containers/NotFoundPage/NotFoundPage";

const initialState = {
    isAuth: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTH': {
            return {...state, isAuth: true}
        }
        default: {
            return state;
        }
    }
}

export const store = createStore(reducer);

function App() {

    return (
        <div className="App">
            <Switch>
                <Route exact path='/' render={props => <HomePage {...props} />} />

                <Route exact path='/user-page' component={UserPage}/>

                <Route exact path='/user-page/:user_id/:post_id' render={(props) => <PostPage {...props} />} />

                <Route exact path='/not-found' component={NotFoundPage}/>

                <Redirect from='*' to='/not-found'/>
            </Switch>
        </div>
    );
}

export default App;