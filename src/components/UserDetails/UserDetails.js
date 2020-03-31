import React, { Component } from 'react';
import { PostItem} from "../PostItem/PostItem";
import { List } from '../List/List';
import { accessToken } from '../../constants';
import {LoadingIndicator} from "../LoadingIndicator/LoadingIndicator";
import './UserDetails.scss';

const CN = 'user-details';

export class UserDetails extends Component {
  state = {
    userPosts: [],
    isPostsLoading: false,
    error: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;

    if (user && prevProps.user && user.id !== prevProps.user.id || !prevProps.user && user) {
      this.loadUserPosts();
    }
  }

  loadUserPosts = () => {
    const { user: { id } } = this.props;

    this.setState({
      isPostsLoading: true
    });

    fetch(`https://gorest.co.in/public-api/posts?access-token=${accessToken}&user_id=${id}`, )
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(data => {
        this.setState({
          userPosts: data.result,
          isPostsLoading: false
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isPostsLoading: false,
          error
        })
      });
  };

  render() {
    const { user } = this.props;
    const { userPosts, isPostsLoading } = this.state;

    if (!user) {
      return (
        <div className={CN}>
          <h3>Please select user</h3>
        </div>
      );
    }

    const { _links, first_name, last_name, dob, email, address, id } = user;
    const { avatar } = _links;

    return (
      <div className={CN}>
        <div className={`${CN}__id`}>id:{id}</div>
        <div className="user-info ">
          <div className="user-info-avatar">
            <img src={avatar.href} alt=""/>
          </div>
          <div className="user-data">
            <p>
              Name: {first_name} {last_name}
            </p>
            <p>
              Email: {email}
            </p>
            <p>
              Date of birth: {dob}
            </p>
            <p>
              Address: {address}
            </p>
          </div>
        </div>
        <div className={`${CN}__posts-block d-flex flex-column`}>
          {
            !isPostsLoading && !!userPosts.length && (
              <>

              <List title="All posts:" options={userPosts} itemRenderer={PostItem} className={`${CN}__posts-list`}/>
              </>
            )
          }
          {
            !isPostsLoading && !userPosts.length && (
              <p>No posts found for selected user</p>
            )
          }
          {
            isPostsLoading && <LoadingIndicator/>

            // (
            //    <div>Posts are in loading state ...</div>
            // )
          }
        </div>
      </div>
    );
  }
}
