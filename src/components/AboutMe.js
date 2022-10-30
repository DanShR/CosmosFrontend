import React from "react";
import { loadAboutMe } from "./Api";

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

    componentDidMount() {
        loadAboutMe()
            .then((data) => {
                this.setState({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    roles: data.appUserRoles
                })
            })        
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