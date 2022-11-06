import React from "react";
import './Registration.css';
import { registration } from './Api';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            errors: [],
            success: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async Registration() {
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthDate: this.state.birthDate
        };

        registration(data)
            .then((newPost) =>
                this.setState({ success: true }));
        /*   fetch(API_URL + '/users/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  'username': this.state.username,
                  'email': this.state.email,
                  'password': this.state.password,
                  'passwordConfirm': this.state.passwordConfirm,
                  "firstName": this.state.firstName,
                  "lastName": this.state.lastName,
                  "birthDate": this.state.birthDate
              })
          })
              .then(() => this.setState({ success: true }))
              .catch(error => { this.setState({ errors: error.body.violations }) }); */
    }

    handleSubmit(event) {
        event.preventDefault();
        this.Registration();
    }

    render() {
        if (this.state.success) {
            return (
                <div className="row">
                    <div className="col l4 offset-l4 s12">
                        <h3>Сonfirmation email has been sent to {this.state.email}</h3>
                        <a href="/">Main page</a>
                    </div>
                </div>
            );
        } else {
            const errors = this.state.errors;
            const fieldErrors = (fieldName) => {
                const messages = errors
                    .filter((error) => error.fieldName === fieldName)
                    .map((error) => error.message)
                    .join(',');
                return <span className="red-text">{messages}</span>
            };
            return (
                <div className="row" >
                    <div className="col l4 offset-l4 s12">
                        <h3>Registration</h3>
                        <div className="red-text">{this.state.error}</div>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <label>
                                <p>Username</p>
                                {fieldErrors('username')}
                                <input type='text' onChange={e => this.setState({ username: e.target.value })} />
                            </label>
                            <label>
                                <p>Email</p>
                                {fieldErrors('email')}
                                <input type='email' onChange={e => this.setState({ email: e.target.value })} />
                            </label>
                            <label>
                                <p>First name</p>
                                {fieldErrors('firstName')}
                                <input type='text' onChange={e => this.setState({ firstName: e.target.value })} />
                            </label>
                            <label>
                                <p>Last name</p>
                                {fieldErrors('lastName')}
                                <input type='text' onChange={e => this.setState({ lastName: e.target.value })} />
                            </label>
                            <label>
                                <p>Birth date</p>
                                {fieldErrors('birthDate')}
                                <input type='date' className="datepicker" onChange={e => this.setState({ birthDate: e.target.value })} />
                            </label>
                            <label>
                                <p>Password</p>
                                {fieldErrors('password')}
                                <input type='password' onChange={e => this.setState({ password: e.target.value })} />
                            </label>
                            <label>
                                <p>Password confirmation</p>
                                {fieldErrors('passwordConfirm')}
                                <input type='password' onChange={e => this.setState({ passwordConfirm: e.target.value })} />
                            </label>
                            <div className="row">
                                <div className="col l12 s12">
                                    <button className=" btn form-button green" type='submit'>Registration</button>
                                </div>
                                <div className="col l12 s12">
                                    <button className="btn form-button light-blue darken-4" type='button' onClick={e => window.location.href = '/'}>Main page</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            )
        }
    }
}

export default Registration;