import React from "react";
import { fetch, clearToken } from "./Api"

class Navbar extends React.Component {


    logout(e) {
        fetch('http://localhost:8080/users/signout', {
            method: 'GET',
            credentials: "include"
        })
            .then(() => {
                clearToken();
                window.location = '/';
            })
            .catch(error => { console.log(error) })
    }

    render() {
        return (
            <div class="navbar-fixed">
                <nav>
                    <div className="nav-wrapper  grey">
                        <a href="/" className="brand-logo">My demo App</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/aboutme" >About me</a></li>
                            <button className="btn-flat grey white-text" href="/" onClick={this.logout}>Exit</button>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;