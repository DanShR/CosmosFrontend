import React from "react"
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

class PostList extends React.Component {

    render() {
        const postItems = this.props.posts.map(post =>
            <PostItem key={post.id}
                id={post.id}
                text={post.text}
                created={post.created}
                deletePost={this.props.deletePost} />)
        return (
            <div>
                <Link to={'/posts/newpost'} ><i className="medium material-icons black-text">add_circle</i></Link>
                {postItems}
            </div >
        );
    }
}

export default PostList;