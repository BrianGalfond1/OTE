import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import User from './components/pages/User';
import Admin from './components/pages/Admin';
import AdminRead from './components/pages/AdminRead';  
import AdminCreate from './components/pages/AdminCreate';
import AdminUpdate from './components/pages/AdminUpdate';
import AdminDelete from './components/pages/AdminDelete'; 
import AdminExpressServerTest from './components/pages/AdminExpressServerTest';     
import Login from './components/auth/Login';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import './App.css';

function onAuthRequired( {history} ){
  history.push('/login');
}

class App extends Component{

  render() {
    return (
      <Router>
         <Security issuer='https://dev-684166.okta.com/oauth2/default'
                  client_id='0oapwakrhhWT6eMW0356'  
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
        <div className="App">
          <Navbar />
          <div className="container">
          <Route path="/" exact={true} component={Home} />
          <SecureRoute path="/user" exact={true} component={User} />
          <SecureRoute path="/admin" exact={true} component={Admin} />
          <SecureRoute path="/admin/read" exact={true} component={AdminRead} />
          <SecureRoute path="/admin/create" exact={true} component={AdminCreate} />
          <SecureRoute path="/admin/update" exact={true} component={AdminUpdate} />
          <SecureRoute path="/admin/delete" exact={true} component={AdminDelete} />
          <SecureRoute path="/admin/test" exact={true} component={AdminExpressServerTest} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-684166.okta.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          </div>
        </div>
        </Security>
      </Router>
    );
  }
}
export default App;
