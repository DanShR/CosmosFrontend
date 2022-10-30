import React from "react";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            file: null
        }
        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(event) {
        this.setState({ file: event.target.files[0] })
    }

    render() {
        return (
            <div>
                <div className="input-field col s12">
                    <textarea id="postText" className="materialize-textarea" onChange={e => this.setState({ text: e.target.value })}></textarea>
                    <label htmlFor="postText">new post</label>
                    <input type="file" onChange={this.onFileChange} />
                    <div>
                        <button className="btn" onClick={e => this.props.addNewPost(e, this.state.text, this.state.file)}>Save post</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPost;