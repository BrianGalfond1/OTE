import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class AdminRead extends Component {

    state = {
        currentUserGroup: '',
        isLoaded: false
    };

    async componentDidMount(){
        const headers = new Headers();
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        
        //Get all the users
        const url = 'https://dev-684166.okta.com/api/v1/groups/00gprkpdkdFhhHHD3356/users';
        const response = await fetch(url,
                        {method: 'GET',
                headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 004drD6vlQO3KsxpUk7l9Z24MJAINkf2tEWMbutnHA'
            }
            );
        const data = await response.json();

        //Get all the users in the admin group
        const url2 = 'https://dev-684166.okta.com/api/v1/groups/00gq4q581jyfyalew356/users';
        const response2 = await fetch(url2,
                        {method: 'GET',
                headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 004drD6vlQO3KsxpUk7l9Z24MJAINkf2tEWMbutnHA'
            }
            );

        const data2 = await response2.json();
            this.setState({
                isLoaded: true,
                items: data,
                items2: data2,
                currentUserGroup: idToken.idToken.claims.groups
            })

    }

    
    render(){
        const {currentUserGroup, isLoaded, items, items2} = this.state;
        var existy = require('existy');
    
        //check that user is member of admin group
        if(  existy(currentUserGroup) ) {
            if( isLoaded ) {
                return(
                    <div>
                        <h1>Here is a list of every user:</h1>
                        <span> <br/> </span>

                    <div className="App">
                            <ul>
                                {items.map(item => (
                                    <li key={item.id}>
                                        Name: {item.profile.firstName} {item.profile.lastName}  |  Email: {item.profile.email}  |  User ID: {item.id}  
                                        |  Last Login: {item.lastLogin}  |  Status: {item.status}
                                    </li>
                                ))}
                            </ul>
                    </div>

                        <h2>Here is a list of every admin:</h2>
                        <span> <br/> </span>

                    <div className="App">
                            <ul>
                                {items2.map(item2 => (
                                    <li key={item2.id}>
                                        Name: {item2.profile.firstName} {item2.profile.lastName}  |  Email: {item2.profile.email}  |  User ID: {item2.id}  
                                        |  Last Login: {item2.lastLogin}  |  Status: {item2.status}
                                    </li>
                                ))}
                            </ul>
                    </div>

                    <span> <br/> </span>
                    <Link to='/admin'>Return to Admin Page</Link><br/>
                </div>
                );}
                
            else{
                return(
                <div>
                    <h1>Data Loading...</h1>
                </div>
            );}}
        
        //Redirect to home page if user is not member of admin group
        else{
            return(
                <div>
                    <Redirect to='/'></Redirect>
                </div>
        );}



    }
};

export default AdminRead