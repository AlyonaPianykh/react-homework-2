import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'

import { Post } from '../Post/Post';
import { List } from '../List/List';
import { accessToken } from '../../constants';
import './UserDetails.scss';
import {Loading} from "../Loading/Loading";

const CN = 'user-details';

// const userDataExample = {
//     "id": "349",
//     "first_name": "Gerhard",
//     "last_name": "Krajcik",
//     "gender": "male",
//     "dob": "1999-04-01",
//     "email": "heather93@example.net",
//     "phone": "324-648-3742 x8692",
//     "website": "http://stoltenberg.org/repellendus-enim-facere-aliquid-dicta-suscipit-vel",
//     "address": "69447 Kuhic Walk Suite 052\nRodriguezborough, WI 27313-8139",
//     "status": "active",
//     "_links": {
//       "self": {
//         "href": "https://gorest.co.in/public-api/users/349"
//       },
//       "edit": {
//         "href": "https://gorest.co.in/public-api/users/349"
//       },
//       "avatar": {
//         "href": "https://lorempixel.com/250/250/people/?47073"
//       }
//     }
//   };
export class UserDetails extends Component {
  state = {
    userPosts: [],
    isPostsLoading: false,
    error: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { user, match: {params: {id}}} = this.props;

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

    const { _links, first_name, last_name, dob, email, gender, address, id } = user;
    const { avatar } = _links;

    return (
      <div className={CN}>
        <div className={`${CN}__id`}>id:{id}</div>
        <div className="user-info ">
          <div className="user-info-avatar">
            <img src={avatar.href} alt="photo"/>
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

              <List title="All posts:" options={userPosts} itemRenderer={Post} className={`${CN}__posts-list`}/>
              </>
            )
          }
          {
            !isPostsLoading && !userPosts.length && (
              <p>No posts found for selected user</p>
            )
          }
          {
            isPostsLoading && (
              <div>Posts are in loading state ...
                <Loading/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
