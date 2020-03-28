import React, {useState, Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import {Button} from '../../components/Button/Button';
import {PostImage} from '../../components/PostImage/PostImage';
import {accessToken} from '../../constants';
import "./PostItem.scss";
import {List} from "../../components/List/List";
import {CommentListItem} from '../../components/CommentListItem/CommentListItem';
import {Loading} from "../../components/Loading/Loading";

const postExample = {
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

export class PostItem extends Component {

    // todo в стейт добавить массив comments, по умолчанию пустой
    // todo в стейт добавить флажок isCommentsLoading, который будет означать идет ли загрузка в данный момент, по умолчанию false
    // todo в стейт добавить флажок commentsLoaded, который будет означать загрузились ли коментарии
    // todo в стейт добавить флажок commentsSectionExpanded, который будет означать отображается ли секция с коментариями в данный момент
    // todo в стейт добавить строку error, чтоб хранить значения ошибок, если возникнут

    state = {
        comments: [],
        isCommentsLoading: false,
        commentsLoaded: false,
        commentsSectionExpanded: false,
        error: ''
    };


    onLoadComments = () => {
        // todo достать из props пропсу item, использовать item.id в запросе ниже в строке 39
        const {item} = this.props;
        //todo поменять стейт так, чтоб было понятно что секция с комментариями открыта и началась загрузка
        //todo т.е. isCommentsLoading и commentsSectionExpanded станут true

        this.setState({
            isCommentsLoading: true,
            commentsSectionExpanded: true
        })

        fetch(`https://gorest.co.in/public-api/comments?access-token=${accessToken}&post_id=${item.id/* todo тут вместо 1 будет id поста т.е. item.id */}`,)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                // todo поменять стейт так, чтоб в comments лежали data.result,
                // todo лоадинг закончился, т.е. isCommentsLoading будет false, а commentsLoaded станет true (т.е. запрос был выполнен)
                this.setState({
                    comments: data.result,
                    isCommentsLoading: false,
                    commentsLoaded: true

                })
            })
            .catch(error => {
                console.log(error);
                // todo поменять стейт так, чтоб
                // todo лоадинг закончился, т.е. isCommentsLoading будет false, а commentsLoaded станет false (т.е. запрос не был выполнен ввиду ошибки)
                // todo в error пойдет значение, error которая вывалилась в результате запроса
                // todo и закроем секцию коментариев т.е. commentsSectionExpanded будет false
                this.setState({
                    commentsLoaded: false,
                    isCommentsLoading: false,
                    error,
                    commentsSectionExpanded: false
                })
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
        {/* todo с помощью  деструктуризации достать из this.state проперти commentsSectionExpanded, error, isCommentsLoading, comments, commentsLoaded */
        }
        const {commentsSectionExpanded, error, isCommentsLoading, comments, commentsLoaded} = this.state
        const {item, isClosed} = this.props;
        const {id, user_id, title, body} = item;

        return (
            <div className={`${CN} card `}>
                <div className={`${CN}__id`}>id: {id}</div>
                <div className="card-body">
                    <div className="card-title"> {title} </div>
                    <div className="card-text text">{body}</div>
                </div>


                <Link className={`${CN}__link-btn`} to={`/posts/${id}`}>
                    <div className={`${CN}__link-btn`} onClick={this.onShowComments}>
                        {commentsSectionExpanded ? 'Hide post details' : 'See post details'}
                    </div>
                </Link>


            </div>
        );
    };
}

