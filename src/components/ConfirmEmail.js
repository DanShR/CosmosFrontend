import React from "react";
import { useSearchParams } from 'react-router-dom';
import { confirmEmail } from "./Api";

export function withRouter(Children) {
    return (props) => {

        const match = { params: useSearchParams() };
        return <Children {...props} match={match} />
    }
}


class ConfirmEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenValid: false,
            done: false,
            error: ''
        }

    }

    componentDidMount() {
        const token = this.props.match.params[0].get('token');
        confirmEmail(token)
            .then((newPost) =>
                this.setState({ done: true }));
    }


    render() {
        let content;
        const tokenValid = this.state.tokenValid;

        if (this.state.done) {
            content =
                <div>
                    <h3>Email confirmed!</h3>
                    <button className="btn form-button darken-4" onClick={e => window.location.href = "/"} >Main page</button>
                </div>
        }
        else if (!tokenValid) {
            content =
                <div>
                    Wrong confirmation token
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

export default withRouter(ConfirmEmail);