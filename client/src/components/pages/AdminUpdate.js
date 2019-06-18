import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class AdminUpdate extends Component {

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
            UserIDtext: "",
            FirstNametext: "",
            LastNametext: "",
            Emailtext: "",
            Logintext: "",
            Phonetext: "",
            currentUserGroup: idToken.idToken.claims.groups
        }
    }

    //This function runs everytime the button is clicked
    clicked(){

        //Update the user profile
        var headers = new Headers();
        var url = 'https://dev-684166.okta.com/api/v1/users/';
        var data = {
            'profile': {
                'firstName': this.refs.FirstNametextbox.value,
                'lastName': this.refs.LastNametextbox.value,
                'email': this.refs.Emailtextbox.value,
                'login': this.refs.Logintextbox.value,
                'mobilePhone': this.refs.Phonetextbox.value
            }
        }
        var response = fetch(url + this.refs.UserIDtextbox.value,
                        {method: 'POST',
                headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 004drD6vlQO3KsxpUk7l9Z24MJAINkf2tEWMbutnHA'},
                
                body: JSON.stringify({ 
                    'profile': {
                        'firstName': this.refs.FirstNametextbox.value,
                        'lastName': this.refs.LastNametextbox.value,
                        'email': this.refs.Emailtextbox.value,
                        'login': this.refs.Logintextbox.value,
                        'mobilePhone': this.refs.Phonetextbox.value
                    }
                })
            }
        );

        //Update the text displayed below button
        this.setState({text: 'User with the ID '+ this.refs.UserIDtextbox.value + ' has been updated.'});

    }

    render(){
        const {currentUserGroup} = this.state;
        var existy = require('existy')

        //Check that user is member of admin group
        if(  existy(currentUserGroup) ) {
        return(
            <div>
            <h1>Update a User's Profile</h1>
            <span> <br/><br/> </span>

            <p>To update a user, enter their User ID below and enter their new profile information (empty fields will be set to blank)</p>
            <p>*Visit the Read Users page to view user IDs</p>
            <span> <br/><br/> </span>
            <p>User ID:</p>
            <input ref="UserIDtextbox" type="UserIDtext"/>
            <span> <br/><br/> </span>
            <p>First Name:</p>
            <input ref="FirstNametextbox" type="FirstNametext"/>
            <span> <br/><br/> </span>
            <p>Last Name:</p>
            <input ref="LastNametextbox" type="LastNametext"/>
            <span> <br/><br/> </span>
            <p>Email (ex. test.user412@email.com):</p>
            <input ref="Emailtextbox" type="Emailtext"/>
            <span> <br/><br/> </span>
            <p>Login (usually same as email):</p>
            <input ref="Logintextbox" type="Logintext"/>
            <span> <br/><br/> </span>
            <p>Mobile Phone:</p>
            <input ref="Phonetextbox" type="Phonetext"/>
            <span> <br/><br/> </span>
            <button onClick={ (e) => { e.preventDefault(); this.clicked();} }>Update User</button> 
            <span> <br/> </span>
            <p>{this.state.text}</p>
            <span> <br/><br/> </span>
            <Link to='/admin'> Return to Admin Page </Link><br/>
            <span> <br/><br/> </span>

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

export default AdminUpdate