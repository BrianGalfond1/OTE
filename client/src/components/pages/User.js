import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {

    state = {
        currentUserName: '',
        currentUserEmail: '',
        currentUserGroup: ''
    }

    componentDidMount(){
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name,
            currentUserGroup: idToken.idToken.claims.groups
        })
    }
    
    render(){
        const {currentUserEmail, currentUserName, currentUserGroup} = this.state;
        return(
            <div>
                <h1>User Page</h1>
                <span> <br/> </span>
                <p>Your account information is below:</p>
                <span> <br/> </span>
                <p>Name: {currentUserName}</p>
                <p>Email: {currentUserEmail}</p>
                <p>Security Group (left blank if not an admin): {currentUserGroup}</p>
                <span> <br/> </span>
                <Link to='/'>Home</Link><br/>
                <Link to='/user'>User</Link><br/>
                <Link to='/admin'>Admin (must have admin priveleges)</Link><br/>
            </div>
        );
    }
};

export default User