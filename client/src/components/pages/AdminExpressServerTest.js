import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class AdminExpressServerTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount(){

        fetch('/api/hello')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json, 
                })
            });
    }
    
    render(){
        var {isLoaded, items} = this.state;

        if(!isLoaded){
            return <div>Loading....</div>
        }
        return(
                <div className="App">
                    <h1>Call API</h1>
                    <p>{items.express}</p>
                </div>
        )

    }
};

export default AdminExpressServerTest