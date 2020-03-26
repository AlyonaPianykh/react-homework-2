import React, { Component } from "react";

import "./PostPreview.scss";

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
export class PostPreview extends Component {

    state = {
        error: '',
    };

    render() {
        console.log(this.state.id);
        const { item } = this.props;
        const { id, user_id, title } = item;
        const { error } = this.state;

        return (
            <div className={`${CN} card `}>
                <div className={`${CN}__id`}>id: {id}</div>
                <div className="card-body">
                    <div className="card-title"> {title} </div>
                </div>

                <div className={`${CN}`}>
                    {error}
                </div>
            </div>
        );
    };
}
