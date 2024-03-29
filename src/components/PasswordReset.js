import React from "react";
import { useParams } from 'react-router-dom';
import { passwordreset, changePassword } from "./Api";

export function withRouter(Children) {
    return (props) => {

        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class PasswordReset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenValid: false,
            done: false,
            error: '',
            password: '',
            passwordConfirm: ''
        }
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        passwordreset(token)
            .then(() =>
                this.setState({ tokenValid: true }));

    }

    changePassword(e) {
        e.preventDefault();
        const token = this.props.match.params.token;
        const data = {
            token: token,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
        };
        changePassword(data)
            .then(() =>
                this.setState({ done: true }));
    }

    render() {
        let content;
        const tokenValid = this.state.tokenValid;

        if (this.state.done) {
            content =
                <div>
                    <h3>Password changed successfully</h3>
                    <button className="btn form-button darken-4" onClick={e => window.location.href = "/"} >Main page</button>
                </div>
        }
        else if (!tokenValid) {
            content =
                <div>
                    Wrong recovery token
                </div>
        } else {
            content =
                <div>
                    <h3>Password reset</h3>
                    <label>
                        <p>New password</p>
                        <input type="password" onChange={e => this.setState({ password: e.target.value, error: '' })} />
                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input type="password" onChange={e => this.setState({ passwordConfirm: e.target.value, error: '' })} />
                    </label>
                    <button className="btn form-button light-blue darken-4" type='button' onClick={this.changePassword}>Change password</button>
                </div>
        }
        return (
            <div className="row">
                <div className="col l4 offset-l4 s12">
                    <div className="red-text">{this.state.error}</div>
                    {content}
                </div>
            </div>
        )
    }
}

export default withRouter(PasswordReset);