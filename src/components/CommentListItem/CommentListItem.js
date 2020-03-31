import React from 'react';

const CN = 'post';

export const CommentListItem = (props) => {
    const { item } = props;

    return (
        <div className={`${CN}__comment`}>
            <div className={`${CN}__comment__author`}>{item.name}</div>
            <div className={`${CN}__comment__text`}>{item.body}</div>
        </div>
    );
};
