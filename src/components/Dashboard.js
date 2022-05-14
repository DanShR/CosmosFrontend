import React from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: null,
            email: null
        }
    }

    async loadData() {  
        const authProps = this.props.authProps;        
        const responce = await fetch('http://localhost:8080/users/' + authProps.getUserInfo().username, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + authProps.getToken()}
        });
      
        if (responce.ok) {            
            const data = await responce.json();
            this.setState({
                id: data.id,
                username: data.username,
                email: data.email
            })
        } else {
            if (responce.status === 401) {
                authProps.removeToken();
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                <div>
                    {this.state.id} {this.state.username} {this.state.email}
                </div>
                <Link to={'/'}>Main </Link>
                <Link to={'/preferences'}>Preferences </Link>
            </div>
        );
    }
}

export default Dashboard;