import React, {Component} from "react";
import {accessToken} from '../../constants';
import {Comment} from "../Comment/Comment";
import {List} from "../List/List";
import "./Post.scss";

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
        error: '',
    };

    onLoadComments = () => {
        // todo достать из props пропсу item, использовать item.id в запросе ниже в строке 39
        const {item} = this.props;
        //todo поменять стейт так, чтоб было понятно что секция с комментариями открыта и началась загрузка
        //todo т.е. isCommentsLoading и commentsSectionExpanded станут true

        this.setState({
            isCommentsLoading: true,
            commentsSectionExpanded: true,
        });

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
                    commentsLoaded: true,
                })
            })
            .catch(error => {
                console.log(error);
                // todo поменять стейт так, чтоб
                // todo лоадинг закончился, т.е. isCommentsLoading будет false, а commentsLoaded станет false (т.е. запрос не был выполнен ввиду ошибки)
                // todo в error пойдет значение, error которая вывалилась в результате запроса
                // todo и закроем секцию коментариев т.е. commentsSectionExpanded будет false
                this.setState({
                    isCommentsLoading: false,
                    error: error,
                    commentSectionExpanded: false,
                })
            });
    };

    onShowComments = () => {
        const {commentsLoaded, commentsSectionExpanded} = this.state;
        const {onLoadComments} = this;
        // todo если запрос был выполнен раннее, т.е. commentsLoaded = true
        //    меняем в стейт значение commentsSectionExpanded на противоположное
        //    делаем return; чтоб остально код этой функции не выполнялся
        //    т.е. тоглим отображение комментариев
        commentsLoaded ?
            this.setState({...this.state, commentsSectionExpanded: !commentsSectionExpanded}) :
            onLoadComments();
        // todo иначе, если запроса не было выполняем его, вызвав метод onLoadComments
    };

    render() {
        {/* todo с помощью  деструктуризации достать из this.state проперти commentsSectionExpanded, error, isCommentsLoading, comments, commentsLoaded */
        }
        const {onShowComments} = this;
        const {item} = this.props;
        const {id, title, body} = item;
        const {error, commentsLoaded, commentsSectionExpanded, isCommentsLoading, comments} = this.state;

        return (
            <div className={`${CN} card`}>
                <div className={`${CN}__id`}>id: {id}</div>
                <div className="card-body">
                    <div className="card-title"> {title} </div>
                    <div className="card-text text">{body}</div>
                </div>

                <div className={`${CN}__link-btn`} onClick={onShowComments}>
                    {commentsSectionExpanded ? 'Hide comments' : 'Show Comments'}
                </div>
                {/* todo создать div который будет выполнять функцию кнопки */}
                {/* todo у него должен быть класс, состоящий из комбинации базового класса CN и строки '__link-btn' */}
                {/* todo в событие  onClick положить метод  onShowComments, объявленный выше */}
                {/* todo в children этого div должна быть положена строка "Show comments" если флажок commentsSectionExpanded в стейте = true*/}
                {/* todo иначе - строка "Hide comments" */}

                {
                    error && (
                        <div className={`${CN}`}>
                            {error}
                        </div>
                    )
                }
                {/* todo создать div который будет выводить ошибку из стейта, если она существует (т.е. не пустая строка) */}

                {
                    commentsSectionExpanded && (
                        isCommentsLoading ?
                            (<div className={`${CN}__loading`}>
                                Loading...
                            </div>) :
                            (
                                comments.length ? (
                                        <div className={`${CN}__comments-block`}>
                                            <List
                                                title="All comments:"
                                                options={comments}
                                                itemRenderer={Comment}
                                                className={`${CN}__comments-list`}
                                            />
                                        </div>
                                    ) :
                                    <div className={`${CN}__no-comments`}>
                                        No comments for this post yet.
                                    </div>
                            )
                    )
                }

                {
                    //todo если секция комментариев открыта, т.е. commentsSectionExpanded = true
                    //   и идет загрузка комментариев, т.е. isCommentsLoading = true
                    // показываем лоадинг индикатор (можно просто строку с надписью "Loading comments ..." в div)
                    // если хотите, чтоб выглядело как в видео, добавьте к div класс состоящий из базового класса CN и "__loading"
                }
                {
                    //todo если секция комментариев открыта, т.е. commentsSectionExpanded = true
                    //   но НЕ идет загрузка комментариев, т.е. isCommentsLoading = false
                    //   и запрос уже был выполнен т.е. commentsLoaded = true
                    //   и массив comments пустой
                    // показываем сообщение, что нет результатов (строку с надписью "No comments for this post yet" в div)
                    // если хотите, чтоб выглядело как в видео, добавьте к div класс состоящий из базового класса CN и "__no-results"
                }
                {
                    // todo если секция комментариев открыта, т.е. commentsSectionExpanded = true
                    //   но НЕ идет загрузка комментариев, т.е. isCommentsLoading = false
                    //   и запрос уже был выполнен т.е. commentsLoaded = true
                    //   и массив comments НЕ пустой
                    //   показываем наши комментарии, каждый можно обвернуть в div с классом базовый класс CN + "__comment"
                    //   рендерим с помощью comments.map
                    //   нужно вывести имя автора comment.name (для стилизации используем класс базовый класс CN + "__comment__author")
                    //   и текст комментария comment.body (для стилизации используем класс базовый класс CN + "__comment__text")
                }
            </div>
        );
    };
}
