import React from 'react';

const CN = 'post';

export function CommentListItem(props) {
    const comment = props.item;
    return (
            <div key={comment.id} className={`${CN}__comment`}>
                <div className={`${CN}__comment__author`}>
                    {comment.name}
                </div>
                <div className={`${CN}__comment__text`}>
                    {comment.body}
                </div>
            </div>
    );
}