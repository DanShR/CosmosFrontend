import React from "react";
import { Route, Routes } from "react-router-dom";
import { fetch } from "./Api"
import NewPost from "./NewPost";
import PostList from "./PostList";

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/posts/', {
            method: 'GET'
        })
            .then(({ body }) => {
                const posts = body.sort((a, b) => { return new Date(b.created) - new Date(a.created) });
                this.setState({ posts: posts })
            })
            .catch(error => { console.log(error) })
    }

    addNewPost(e, text) {
        fetch('http://localhost:8080/posts/newpost', {
            method: 'POST',
            body: JSON.stringify({
                'text': text
            })
        })
            .then(({ body }) => {
                this.setState({
                    posts: [...this.state.posts, body]
                });
                window.location.href = '/posts'
            })
            .catch(error => { console.log(error) })
    }

    deletePost(e, id) {
        fetch('http://localhost:8080/posts/deletePost?id=' + id, {
            method: 'DELETE'
        })
            .then(() => {
                this.setState({ posts: this.state.posts.filter(post => post.id !== id) });
            })
            .catch(error => { console.log(error) })
    }


    render() {
        return (
            < div className="row" >
                <div className="col l5 offset-l4 s12">
                    <Routes>
                        <Route path="/newpost" element={<NewPost addNewPost={this.addNewPost} />} />
                       
                        <Route path="/" element={<PostList posts={this.state.posts} deletePost={this.deletePost} />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Posts;