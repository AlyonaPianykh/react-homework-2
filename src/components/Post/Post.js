import React, {Component} from "react";
import {accessToken} from '../../constants';
import "./Post.scss";
import {CommentListItem} from "../CommentListItem/CommentListItem";
import {List} from "../List/List";
import {LoadingIndicator} from "../LoadingIndicator/LoadingIndicator";

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

export class Post extends Component {
    state = {
        comments: [],
        isCommentsLoading: false,
        commentsLoaded: false,
        commentsSectionExpanded: false,
        error: ""
    };

    onLoadComments = () => {
        const {item} = this.props;

        this.setState({
            isCommentsLoading: true,
            commentsSectionExpanded: true
        });

        fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${item.id}`,)
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
          return this.onLoadComments()
      } else {
          return this.setState({commentsSectionExpanded: !commentsSectionExpanded});
      }
  };

  render() {
      const {commentsSectionExpanded, error, isCommentsLoading, comments, commentsLoaded} = this.state;
      const {item} = this.props;
      const {id, title, body} = item;

      return (
          <div className={`${CN} card `}>
              <div className={`${CN}__id`}>id: {id}</div>
              <div className="card-body">
                  <div className="card-title"> {title} </div>
                  <div className="card-text text">{body}</div>
              </div>

              <div className={`${CN}__link-btn`} onClick={this.onShowComments}>
                  {commentsSectionExpanded ? "Hide comments" : "Show comments"}
              </div>
              <div>
                  {error && <div>{error}</div>}
              </div>

              {commentsSectionExpanded && isCommentsLoading &&
              <div className={`${CN}__loading`}>
                  <LoadingIndicator/>
              </div>}

              {commentsSectionExpanded && !isCommentsLoading && commentsLoaded && !comments.length &&
              <div className={`${CN}__no-results`}>{"No comments for this post yet"}</div>}

              {commentsSectionExpanded && !isCommentsLoading && commentsLoaded && !!comments.length &&
              <List itemRenderer={CommentListItem} options={comments}/>}
          </div>
    );
  };
}
