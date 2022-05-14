import React from "react";
import { fetch } from "./Api"

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            email: '',
            roles: ''
        }
    }

    async loadAboutMe() {

        fetch('http://localhost:8080/users/me', {
            method: 'GET',
            credentials: "include"
        })
            .then(({ body }) => {
                this.setState({
                    id: body.id,
                    username: body.username,
                    email: body.email,
                    roles: body.appUserRoles
                })
            })
            .catch(error => { console.log(error) })
    }

    componentDidMount() {
        this.loadAboutMe();
    }

    render() {
        return (
            <div className="container " >
                <div className="row ">
                    <div className="col 12 ">
                        <div >id: {this.state.id}</div>
                        <div>username: {this.state.username}</div>
                        <div>email: {this.state.email}</div>
                        <div>roles: {this.state.roles}</div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AboutMe;