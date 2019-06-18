import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }


  

  render() {
    if (this.state.authenticated === null) return null;

    var loginStatus;

    const button = this.state.authenticated ?
        (<div>
            <p></p>
            <p>You are currently signed in, click below to sign out:</p>
            <button onClick={this.logout}>Logout</button>
        </div> 
        ):
        (<div>
            <p></p>
            <p>You have not signed in, click below to sign in:</p>
            <button onClick={this.login}>Login</button>
        </div>
        );

    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <span> <br/> </span>
        <p>This application contains 3 pages; a Home Page available to anyone,
            a User Page available to all registered users after logging in,
            and an Admin Page available to users within the admin group.
            Navigate using the links on each page or with the navigation bar above.
        </p>
        <span> <br/> </span>
        <Link to='/'>Home</Link><br/>
        <Link to='/user'>User (must be a registered user)</Link><br/>
        <Link to='/admin'>Admin (must be a user with admin priveleges)</Link><br/>
        {button}
      </div>
    );
  }
});
