import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class AdminDelete extends Component {

    state = {
        currentUserGroup: '',
    }

    //Adds "Admin" to the users currentGroup if they are a member
    async componentDidMount(){
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
                currentUserGroup: idToken.idToken.claims.groups
        })
    }


    constructor(){
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        super();
        this.state = {
            text: "",
            currentUserGroup: idToken.idToken.claims.groups
        }
    }

    //This function runs everytime the button is clicked
    clicked(text){

        //First you must deactivate user
        var headersDeactivate = new Headers();
        var headersDelete = new Headers();
        var urlBase = 'https://dev-684166.okta.com/api/v1/users/';
        var urlEnd = '/lifecycle/deactivate';
        var response = fetch(urlBase + this.refs.textbox.value + urlEnd,
                        {method: 'POST',
                headersDeactivate,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 004drD6vlQO3KsxpUk7l9Z24MJAINkf2tEWMbutnHA'
            }
        );

        //After deactivation, user is deleted
        var url2 = 'https://dev-684166.okta.com/api/v1/users/';
        var response2 = fetch(url2 + this.refs.textbox.value,
                        {method: 'DELETE',
                headersDelete,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               'Authorization': 'SSWS 004drD6vlQO3KsxpUk7l9Z24MJAINkf2tEWMbutnHA'
            }
            );

        //Update the text displayed below button
        this.setState({text: 'User with the ID '+ this.refs.textbox.value + ' has been deleted.'});

    }

    
    render(){
        const {currentUserGroup} = this.state;
        var existy = require('existy')

        //Check that user is member of admin group
        if(  existy(currentUserGroup) ) {
        return(
            <div>
            <h1>Delete Users</h1>
            <span> <br/><br/> </span>

            <p>To delete a user, enter their User ID below then click the "Delete User" button (user will be DEPROVISIONED then DELETED)</p>
            <p> To delete an admin, click the button twice </p>
            <p>*Visit the Read Users page to view user IDs</p>
            <input ref="textbox" type="text"/>
            <span> <br/> </span>
            <button onClick={ (e) => { e.preventDefault(); this.clicked();} }>Delete User</button> 
            <span> <br/> </span>
            <p>{this.state.text}</p>
            <span> <br/><br/> </span>
            <Link to='/admin'> Return to Admin Page </Link><br/>

        </div>
        );}
        
         //Redirect to home page if user is not member of admin group
        else{
        return(
        <div>
            <Redirect to='/'></Redirect>
        </div>
        );}
    }
};

export default AdminDelete