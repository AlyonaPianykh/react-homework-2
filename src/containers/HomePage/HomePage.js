import React, {Component} from 'react';
import { Button } from '../../components/Button/Button'
import {connect} from "react-redux";

class HomePage extends Component {

    onAuthHandler = () => {
        const {history , auth} = this.props;
        auth();
        debugger
        console.log(this.props);
        history.push(`/user-page`);
    };

    render() {
        const { onAuthHandler } = this;
        const {isAuth} = this.props;

        return (
            <div>
                <h2>
                    {
                        !isAuth && `YOU AREN'T AUTHORIZED!`
                    }
                </h2>
                <h2>Wanna see posts? Click button</h2>
                <Button onClick={onAuthHandler} label='Auth'/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        auth: () => dispatch({type: 'AUTH'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);