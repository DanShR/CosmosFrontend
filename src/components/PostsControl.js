import React from "react";

class PostsControl extends React.Component {

    render() {
        return <button onClick={e => this.props.setIsNewPost(e, true)}><i className="small material-icons black-text">add_circle</i></button>                
    }

}

export default PostsControl;