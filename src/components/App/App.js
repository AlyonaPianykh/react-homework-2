import React from 'react';
import {UserPage} from '../../containers/UserPage/UserPage';
import {Route , Switch} from "react-router-dom";
import './App.css';

function App() {
    return (
        <div className="App">
            {/*<NavLink exact to='/user-page'>*/}
            {/*    <UserPage />*/}
            {/*</NavLink>*/}
            <Switch>
                <Route exact path='/user-page' component={UserPage}/>
            </Switch>
        </div>
    );
}

export default App;
