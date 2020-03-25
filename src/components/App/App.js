import React from 'react';
import {UserPage} from '../../containers/UserPage/UserPage';
import {PostPage} from "../../containers/PostPage/PostPage";
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

                <Route exact path='/user-page/:user_id/:post_id' render={(props) => <PostPage {...props} />} />

                <Route path='*'><h1>Not Found 404 :3</h1></Route>
            </Switch>
        </div>
    );
}

export default App;
