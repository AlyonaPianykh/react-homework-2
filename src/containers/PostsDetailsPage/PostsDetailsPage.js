import React, { useState, Component } from "react";
import { Button } from '../../components/Button/Button';
import { PostImage } from '../../components/PostImage/PostImage';
import { accessToken } from '../../constants';
import "./PostDetailsPage.scss";
import { List } from "../../components/List/List";
import { CommentListItem } from '../../components/CommentListItem/CommentListItem';
import { Loading } from "../../components/Loading/Loading";

const postExample =  {
    "id": "676",
    "user_id": "366",
    "title": "Et deserunt eos commodi est in atque culpa. Et tempora velit et ut nisi quae et.",
    "body": "Rerum eaque et ab. Quas deleniti nostrum qui molestiae deleniti quo. Quia architecto consectetur recusandae eum culpa ea laudantium.\n\nSoluta sequi aut illo laboriosam sed ab qui incidunt. Distinctio asperiores alias laudantium quod neque ducimus et. Esse et qui ab.\n\nDolorum suscipit non omnis voluptates ipsa perspiciatis quia. Odio consequuntur aut vitae unde quia ad ipsum. Temporibus tempore est laborum eaque repellendus soluta iure.\n\nQuisquam cupiditate inventore fuga adipisci rerum blanditiis. Mollitia sed perspiciatis voluptate non impedit velit eum. Quas dolor sint ipsam.",
    "_links": {
      "self": {
        "href": "https://gorest.co.in/public-api/posts/676"
      },
      "edit": {
        "href": "https://gorest.co.in/public-api/posts/676"
      }
    }
  };

const CN = 'post';

export class PostsDetailsPage extends Component {
    state = {
        post: null,
        isPostLoading: false,
        comments: [],
        isCommentsLoading: false,
        commentsLoaded: false,
        commentsSectionExpanded: false,
        error: ''
    };

    onPostLoad = (id) => {
        this.setState({isPostLoading: true});

        fetch(`https://gorest.co.in/public-api/posts/${id}?access-token=${accessToken}`)
            .then(res => {
                if(!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => this.setState({isPostLoading: false, post: data.result}))
            .catch(error => {
                console.log(error);
                this.setState({isPostLoading: false});
            })
    }

    componentDidMount() {
        const {params: {id}} = this.props.match;

        if(!!id) {
            this.onPostLoad(id);
        }
    };

    onBackToPosts = () => {
        const {history} = this.props;
        history.goBack();
    };

    onLoadComments = () => {
        const {post} = this.state;

        this.setState({isCommentsLoading: true, commentsSectionExpanded: true});

        fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${post.id}`,)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                console.log(data.result);
                this.setState({comments: data.result, isCommentsLoading: false, commentsLoaded: true});
            })
            .catch(error => {
                console.log(error);
                this.setState({error, isCommentsLoading: false, commentsLoaded: false, commentsSectionExpanded: false});
            });
    };

    onShowComments = () => {
        const {commentsLoaded} = this.state;

        if (commentsLoaded) {
            this.setState(prev => ({commentsSectionExpanded: !prev.commentsSectionExpanded}));
            return;
        }

        this.onLoadComments();
    };

    render() {
        const {commentsSectionExpanded, error, isCommentsLoading, comments, commentsLoaded, post, isPostLoading} = this.state;

        if(!post && !isPostLoading){
            return (<div>No post</div>);
        } else if(!post && isPostLoading){
            return (<Loading />);
        }


        const {id, user_id, title, body} = post;

        return (
            <div className={`${CN} card `}>
                <div className={`btn btn-primary`} onClick={this.onBackToPosts}>{' < Go to users lists'}</div>
                <div className={`${CN}__id`}>id: {id}</div>
                <div className="card-body">
                    <div className="card-title"> {title} </div>
                    <div className="card-text text">{body}</div>
                </div>

                <div className={`${CN}__link-btn`}
                     onClick={this.onShowComments}>{commentsSectionExpanded ? 'Hide comments' : 'Show comments'}</div>

                {error && (<div className="alert-danger">{error}</div>)}

                {isCommentsLoading && (<Loading/>)}

                {(commentsSectionExpanded && !isCommentsLoading && commentsLoaded && !comments.length) &&
                (<div className={`${CN}__no-results`}>No comments for this post yet</div>)}


                {(commentsSectionExpanded && !isCommentsLoading && commentsLoaded && !!comments.length) && (
                    <List itemRenderer={CommentListItem} options={comments}/>)}
            </div>
        );
    };
}