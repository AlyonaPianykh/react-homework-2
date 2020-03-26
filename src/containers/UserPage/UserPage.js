import React, {Component} from 'react';
import {List} from '../../components/List/List';
import {UserDetails} from '../../components/UserDetails/UserDetails';
import {UserListOption} from '../../components/UserListOption/UserListOption';
import {accessToken} from '../../constants';
import './UserPage.scss';
import {connect} from "react-redux";

const CN = 'user-page';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersList: [],
            selectedUserId: '',
            isLoading: false,
            error: ''
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    onPostSelect = (id) => {
        const {
            history, match: {
                url
            }
        } = this.props;
        const { selectedUserId } = this.state;

        history.push(`${url}/${selectedUserId}/${id}`)
    };

    onUserSelect = (userId) => {
        this.setState({
            selectedUserId: userId
        });
    };

    loadUsers = () => {
        this.setState({
            isLoading: true
        });

        fetch(`https://gorest.co.in/public-api/users?access-token=${accessToken}`)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    usersList: data.result,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    error: 'error  happened'
                });
            });
    };

    render() {
        const {usersList, selectedUserId, isLoading, error} = this.state;
        const { isAuth } = this.props;
        const selectedUser = usersList.length && usersList.find(user => user.id === selectedUserId);

        return (
            // isAuth ?
                (<div className={CN}>
                {
                    error && <div>{error}</div>
                }
                {
                    isLoading && <div>Loading...</div>
                }

                {
                    !isLoading && (
                        <div className={`${CN}__content d-flex`}>
                            <List
                                options={usersList}
                                onOptionSelect={this.onUserSelect}
                                selectedOptionId={selectedUserId}
                                itemRenderer={UserListOption}
                                className={`${CN}__user-list`}
                                title="All Users:"
                            />

                            <UserDetails user={selectedUser} onPostSelect={this.onPostSelect}/>

                        </div>
                    )
                }

            </div>) //:
                // (
                //     <h2>YOU ARE NOT AUTHORIZED !</h2>
                // )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
    }
};

export default connect(mapStateToProps)(UserPage)