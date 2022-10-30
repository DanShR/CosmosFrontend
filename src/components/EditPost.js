import React from "react";

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        }
    }

    render() {       
        return (
            <div>               
                <div className="input-field col s12">
                    <h3>Edit post</h3>
                    <textarea  id="postText" className="materialize-textarea" onChange={e => this.setState({ text: e.target.value })}>{this.state.text}</textarea>                    
                    <button className="btn" onClick={e => this.props.updatePost(e, this.props.id, this.state.text)}>Save post</button>
                </div>
            </div>
        )
    }
}

export default EditPost;