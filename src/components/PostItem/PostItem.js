import React, {Component} from "react";
import {Link} from "react-router-dom";

const CN = 'post';

export class PostItem extends Component {
    render() {
        const { item } = this.props;
        const { id, title, body } = item;
        return (
            <Link to={`/posts/${id}`}>See post details
                <div className={`${CN} card `}>

                    <div className={`${CN}__id`}>id: {id}</div>
                    <div className="card-body">
                        <div className="card-title"> {title} </div>
                        <div className="card-text text">{body}</div>
                    </div>
                </div>
            </Link>
        );
    };
}