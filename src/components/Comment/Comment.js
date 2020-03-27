import React from 'react';
// import 'Comment.scss'

const CN = 'post';

export const Comment = (props) => {

    const { item } = props;

    return (
        <div>
            <div className={`${CN}__comment`} key={item.name}>
                <div className={`${CN}__comment__author`}>{item.name}</div>
                <div className={`${CN}__comment__text`}>{item.body}</div>
            </div>
        </div>
    );
}