import React, {Component} from "react";
import './Loading.scss'

export class Loading extends Component{
    render() {
        return (
            <div className='loading'>
                <div className="loadingspinner"/>
            </div>

        );
    }

}