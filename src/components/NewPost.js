import React from "react";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {       
        return (
            <div>               
                <div className="input-field col s12">
                    <textarea id="postText" className="materialize-textarea" onChange={e => this.setState({ text: e.target.value })}></textarea>
                    <label htmlFor="postText">new post</label>
                    <button className="btn" onClick={e => this.props.addNewPost(e, this.state.text)}>Save post</button>
                </div>
            </div>
        )
    }
}

export default NewPost;