import React, {Component} from "react";
import {accessToken} from '../../constants';
import {CommentListItem} from "../../components/CommentListItem/CommentListItem";
import {List} from "../../components/List/List";
import {LoadingIndicator} from "../../components/LoadingIndicator/LoadingIndicator";
import "./PostDetailsPage.scss";

// const postExample =  {
//     "id": "676",
//     "user_id": "366",
//     "title": "Et deserunt eos commodi est in atque culpa. Et tempora velit et ut nisi quae et.",
//     "body": "Rerum eaque et ab. Quas deleniti nostrum qui molestiae deleniti quo. Quia architecto consectetur recusandae eum culpa ea laudantium.\n\nSoluta sequi aut illo laboriosam sed ab qui incidunt. Distinctio asperiores alias laudantium quod neque ducimus et. Esse et qui ab.\n\nDolorum suscipit non omnis voluptates ipsa perspiciatis quia. Odio consequuntur aut vitae unde quia ad ipsum. Temporibus tempore est laborum eaque repellendus soluta iure.\n\nQuisquam cupiditate inventore fuga adipisci rerum blanditiis. Mollitia sed perspiciatis voluptate non impedit velit eum. Quas dolor sint ipsam.",
//     "_links": {
//       "self": {
//         "href": "https://gorest.co.in/public-api/posts/676"
//       },
//       "edit": {
//         "href": "https://gorest.co.in/public-api/posts/676"
//       }
//     }
//   };

const CN = 'post';

export class PostDetailsPage extends Component {
    state = {
        post: null,
        isPostsLoading: false,
        comments: [],
        isCommentsLoading: false,
        commentsLoaded: false,
        commentsSectionExpanded: false,
        error: ""
    };

    componentDidMount() {
        const {match} = this.props;
        if (!!match.params.id) {
            this.onPostLoad(match.params.id)
        }
    }

    onPostLoad = (id) => {
        this.setState({
            isPostsLoading: true,
        });

        fetch(`https://gorest.co.in/public-api/posts/${id}?access-token=${accessToken}`,)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                this.setState({
                    post: data.result,
                    isPostsLoading: false
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isPostsLoading: false,
                    error: error
                })
            })
    };

    onLoadComments = () => {
        const {post} = this.state;

        this.setState({
            isCommentsLoading: true,
            commentsSectionExpanded: true
        });

        fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${post.id}`,)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                this.setState({
                    comments: data.result,
                    isCommentsLoading: false,
                    commentsLoaded: true
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isCommentsLoading: false,
                    commentsLoaded: false,
                    commentsSectionExpanded: false
                })
            });
    };

  onShowComments = () => {
      const {commentsLoaded, commentsSectionExpanded} = this.state;
      if (!commentsLoaded) {
          this.onLoadComments()
      } else {
          this.setState({commentsSectionExpanded: !commentsSectionExpanded});
      }
  };

  render() {
      const {post, isPostsLoading, commentsSectionExpanded, error, isCommentsLoading, comments, commentsLoaded} = this.state;

      if (!post && !isPostsLoading){
          return <div>No Post</div>
      } else if (!post && isPostsLoading) {
          return <LoadingIndicator/>
      } else {
          const {id, title, body} = post;
          return (
              <div>
                  <div className={`${CN} card `}>
                      <div className={`${CN}__id`}>id: {id}</div>
                      <div className="card-body">
                          <div className="card-title">{title}</div>
                          <div className="card-text text">{body}</div>
                      </div>
                      <div className={`${CN}__link-btn`} onClick={this.onShowComments}>
                          {commentsSectionExpanded ? "Hide comments" : "Show comments"}
                      </div>
                      {error && <div>{error}</div>}
                      {commentsSectionExpanded && isCommentsLoading &&
                      <div className={`${CN}__loading`}>
                          <LoadingIndicator/>
                      </div>}
                      {commentsSectionExpanded && !isCommentsLoading && commentsLoaded && !comments.length &&
                      <div className={`${CN}__no-results`}>"No comments for this post yet"</div>}
                      {commentsSectionExpanded && !isCommentsLoading && commentsLoaded && !!comments.length &&
                      <List itemRenderer={CommentListItem} options={comments}/>}
                  </div>
              </div>
          );
      }
  };
}