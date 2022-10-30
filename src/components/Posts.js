import React from "react";
import { loadUserPosts, addNewPost, deletePost, updatePost } from "./Api";
import EditPost from "./EditPost";
import NewPost from "./NewPost";
import PostList from "./PostList";
import PostsControl from "./PostsControl";

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isNewPost: false,
            isEditPost: false,
            editPostId: null
        }
        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.setIsNewPost = this.setIsNewPost.bind(this);
        this.setIsEditPost = this.setIsEditPost.bind(this);
    }

    componentDidMount() {
        loadUserPosts()
            .then((posts) => this.setState({ posts: posts.sort((a, b) => { return new Date(b.created) - new Date(a.created) }) }))
    }

    addNewPost(e, text, file) {
        const data = new FormData();
        data.append('text', text);
        data.append('file', file);
        addNewPost(data)
            .then((newPost) =>
                this.setState({
                    posts: [newPost, ...this.state.posts],
                    isNewPost: false
                }));
    }

    deletePost(e, id) {
        deletePost(id)
            .then(() => this.setState({ posts: this.state.posts.filter(post => post.id !== id) }))
    }

    updatePost(e, id, text) {
        updatePost(id, text)
            .then((updatedPost) => {
                const posts = this.state.posts.map(post => { return post.id === id ? updatedPost : post });
                this.setState({
                    posts: posts,
                    isEditPost: false
                });
            })
    }

    setIsNewPost(e, value) {
        this.setState({ isNewPost: value });
    }

    setIsEditPost(e, value, id) {
        this.setState({ isEditPost: value, editPostId: id });
    }

    render() {
        let content;

        if (this.state.isNewPost) {
            content = <NewPost addNewPost={this.addNewPost} />
        } else if (this.state.isEditPost) {
            const text = this.state.posts.filter(post => post.id === this.state.editPostId)[0].text;
            content = <EditPost updatePost={this.updatePost} id={this.state.editPostId} text={text} />
        } else {
            content = <div>
                <PostsControl setIsNewPost={this.setIsNewPost} />
                <PostList posts={this.state.posts} deletePost={this.deletePost} setIsEditPost={this.setIsEditPost} />
            </div>
        }

        return (
            < div className="row" >
                <div className="col l5 offset-l4 s12">
                    {content}
                </div>
            </div>
        );
    }
}

export default Posts;