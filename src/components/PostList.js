import React from "react"
import PostItem from "./PostItem";

class PostList extends React.Component {

    render() {
        const postItems = this.props.posts.map(post =>
            <PostItem key={post.id}
                id={post.id}
                text={post.text}
                filename={post.filename}
                created={post.created}
                deletePost={this.props.deletePost}
                setIsEditPost={this.props.setIsEditPost} />)
        return (
            <div>           
                    <img alt="" src="./image.png"/>                    
                {postItems}
            </div >
        );
    }
}

export default PostList;