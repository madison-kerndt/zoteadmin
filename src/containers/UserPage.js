import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions';
import User from '../components/User';
// import Repo from '../components/Repo';
// import List from '../components/List';
// import zip from 'lodash/zip';

const loadData = ({ login, loadUser }) => {
  loadUser(login, [ 'name' ]);
};

class UsersPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
    starredPagination: PropTypes.object,
    starredRepos: PropTypes.array.isRequired,
    starredRepoOwners: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadStarred: PropTypes.func.isRequired
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true)
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return
      <h1>
        <i>Loading {login}{"'s profile..."}</i>
      </h1>
    }

    const { } = this.props
    return (
      <div>
        <User user={user} />
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase()

  const {
    entities: { users }
  } = state

  return {
    login,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser
})(UsersPage)
