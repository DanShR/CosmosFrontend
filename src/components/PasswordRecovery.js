import React from "react";

class PasswordRecovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            byUsername: false,
            byEmail: false,
            username: '',
            email: '',
            done: false,
            error: ''
        }
        this.recoverByUsername = this.recoverByUsername.bind(this);
        this.recoverByEmail = this.recoverByEmail.bind(this);
    }

    recoverByUsername(e) {
        fetch('http://localhost:8080/users/passwordrecovery/username?username=' + this.state.username, {
            method: 'GET'
        })
            .then((responce) => {
                if (responce.ok) {
                    this.setState({
                        done: true,
                        message: ''
                    })
                } else {
                    responce.json().then((body) => {
                        this.setState({
                            done: false,
                            error: body.message
                        })
                    });

                }
            })
            .catch(error => { console.log(error) })
    }

    recoverByEmail(e) {
        fetch('http://localhost:8080/users/passwordrecovery/email?email=' + this.state.email, {
            method: 'GET'
        })
            .then((responce) => {
                if (responce.ok) {
                    this.setState({ done: true, message: '' })
                } else {
                    responce.json()
                        .then((body) => this.setState({ done: false, error: body.message }));
                }
            })
            .catch(error => { console.log(error) })
    }

    render() {
        let content;
        if (this.state.done) {
            content =
                <div>
                    <h3>Password recovery email has been sent to your email</h3>
                </div>
        } else {
            if (!this.state.byUsername && !this.state.byEmail) {
                content =
                    <div>
                        <h3>How to recover password?</h3>
                        <button className="btn form-button darken-4" onClick={e => this.setState({ byUsername: true })} >By username</button>
                        <button className="btn form-button darken-4" onClick={e => this.setState({ byEmail: true })}>By email</button>
                    </div>
            }

            if (this.state.byUsername) {
                content =
                    <div>
                        <h3>Enter username</h3>
                        <div className="red-text">{this.state.error}</div>
                        <input type="text" onChange={e => this.setState({ username: e.target.value, error: '' })} />
                        <button className="btn form-button light-blue darken-4" type='button' onClick={this.recoverByUsername}>Recover password</button>
                    </div>
            }

            if (this.state.byEmail) {
                content =
                    <div>
                        <h3>Enter email</h3>
                        <div className="red-text">{this.state.error}</div>
                        <input type="email" onChange={e => this.setState({ email: e.target.value, error: '' })} />
                        <button className="btn form-button light-blue darken-4" type='button' onClick={this.recoverByEmail}>Recover password</button>
                    </div>
            }
        }

        return (
            <div className="row">
                <div className="col l4 offset-l4 s12">
                    {content}
                    <button className="btn form-button darken-4" onClick={e => window.location.href="/"} >Main page</button>
                </div>
            </div>
        )
    }
}

export default PasswordRecovery;