import React from 'react';

const CN = 'user-list-option';

export const CommentListItem = (props) => {
    const comment = props.item;
    const CN = 'post';

    return (
        <div key={comment.id} className={`${CN}__comment`}>
            <div className={`${CN}__comment__author`}>{comment.name}</div>
            <div className={`${CN}__comment__text`}>{comment.body}</div>
        </div>
    );
};