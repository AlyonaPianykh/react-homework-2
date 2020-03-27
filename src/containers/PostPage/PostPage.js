import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Post} from "../../components/Post/Post";
import {Button} from "../../components/Button/Button";
import {accessToken} from "../../constants";

export const PostPage = ({history}) => {
    let {user_id, post_id} = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        console.log(user_id, post_id);
        fetch(`https://gorest.co.in/public-api/posts?access-token=${accessToken}&user_id=${user_id}`,)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                console.log(data);
                setPost(data.result.find(post => post.id === post.id));
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setError(error);
            })
    }, []);

    const goBackHandler = () => {
        history.goBack();
    };

    return (
        <Fragment>
            <Button label='Go Back' onClick={goBackHandler}/>

            {
                loading && <div>Loading...</div>
            }
            {
                error && <div>{error}</div>
            }
            {
                post && (
                    <div className='d-flex justify-content-center'>
                        <Post item={post}/>
                    </div>
                )
            }
        </Fragment>
    );
};
