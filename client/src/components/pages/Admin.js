import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class Admin extends Component {

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

        //API request to put the entered User ID into Admin Group
        var headers = new Headers();
        var url = 'https://dev-684166.okta.com/api/v1/groups/00gq4q581jyfyalew356/users/';
        var response = fetch(url + this.refs.textbox.value,
                        {method: 'PUT',
                headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 004drD6vlQO3KsxpUk7l9Z24MJAINkf2tEWMbutnHA'
            });

        //Update the text displayed below button
        this.setState({text: 'User with the ID '+ this.refs.textbox.value + 
        ' is now an admin. If this user ID does not exist, no changes were made. Check "Read Users" to verify. '});

    }

    
    render(){
        const {currentUserGroup} = this.state;
        var existy = require('existy')

        //Check that user is member of admin group
        if(  existy(currentUserGroup) ) {
        return(
            <div>
            <h1>Admin Page</h1>
            <p>You have been verified as an administator. You may add new admins or explore the admin pages.</p>
            <span> <br/><br/> </span>

            <p>To make a user an admin, enter their User ID below then click the "Add Admin" button (user status can't be DEPROVISIONED)</p>
            <p>*Visit the Read Users page to view user IDs</p>
            <input ref="textbox" type="text"/>
            <span> <br/> </span>
            <button onClick={ (e) => { e.preventDefault(); this.clicked();} }>Add Admin</button> 
            <span> <br/> </span>
            <p>{this.state.text}</p>
            <span> <br/><br/> </span>
            <p>Admin Pages:</p>
            <Link to='/admin/read'>Read Users </Link><br/>
            <Link to='/admin/create'>Create Users </Link><br/>
            <Link to='/admin/update'>Update Users </Link><br/>
            <Link to='/admin/delete'>Delete Users </Link><br/>
            <Link to='/admin/test'>Admin Express Server Test </Link><br/>
            <span> <br/><br/> </span>

            <p>Main Pages:</p>
            <Link to='/'>Home</Link><br/>
            <Link to='/user'>User</Link><br/>
            <Link to='/admin'>Admin </Link><br/>
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

export default Admin