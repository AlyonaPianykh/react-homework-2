import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {accessToken} from "../../constants";

const CN = 'post';

export class PostItem extends Component {
    state = {
        comments: [],
        isCommentLoading: false,
        commentsLoaded: false,
        commentsSectionExpanded: false,
        error: ""
    };

    onLoadComments = () => {
        const {item} = this.props;

        this.setState({isCommentLoading: true, commentsSectionExpanded: true});

        fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${item.id}`,)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                this.setState({comments: data.result, isCommentLoading: false, commentsLoaded: true})
            })
            .catch(error => {
                console.log(error);
                this.setState({isCommentLoading: false, commentsLoaded: false, error, commentsSectionExpanded: false});
            });
    };

    onShowComments = () => {
        if (this.state.commentsLoaded) {
            this.setState(prevState => ({commentsSectionExpanded: !prevState.commentsSectionExpanded}));
            return;
        }

        this.onLoadComments();
    };

    render() {
        const {commentsSectionExpanded} = this.state;
        const {item} = this.props;
        const {id, title, body} = item;

        return (
            <div className={`${CN} card `}>
                <div className={`${CN}__id`}>id: {id}</div>
                <div className="card-body">
                    <div className="card-title"> {title} </div>
                    <div className="card-text text">{body}</div>
                </div>

                <Link to={`/posts/${id}`}>
                    <div
                        className={`${CN}__link-btn`}
                        onClick={this.onShowComments}>
                        {!commentsSectionExpanded ? "Show comments" : "Hide comments"}
                    </div>
                </Link>
            </div>
        );
    };
}