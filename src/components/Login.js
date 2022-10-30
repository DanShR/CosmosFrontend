import React from "react";
import './Login.css';
import { login } from './Api'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        const setIsAuth = this.props.authProps.setIsAuth;
        event.preventDefault();
        login(this.state.username, this.state.password)
            .then(() => {
                setIsAuth(true)
            })
            .catch(error => {
                setIsAuth(false);
                this.setState({ error: error.response.data.message });
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col l4 offset-l4 s12">
                    <div>{process.env.REACT_APP_NOT_SECRET_CODE}</div>
                    <h3>Please Log In {this.props.testProp}</h3>
                    <div className="red-text">{this.state.error}</div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={e => this.setState({ username: e.target.value })} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => this.setState({ password: e.target.value })} />
                        </label>
                        <div className="row">
                            <div className="col l12 s12">
                                <button className="btn form-button green" type="submit">Login</button>
                            </div>
                            <div className="col l12 s12">
                                <button className="btn form-button light-blue darken-4" type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = '/registration';;
                                }}>Registration</button>
                            </div>
                            <div className="col l12 s12">
                                <a href="/passwordrecovery">I don't remember my password</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login;