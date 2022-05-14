import React from "react";

class PostItem extends React.Component {

    render() {
        let created = new Date(this.props.created);
        const formattedDate = created.toLocaleString();        
        return (
            <div className="card horizontal">
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{this.props.text}</p>
                    </div>
                    <span className=" right-align">
                        created at {formattedDate}
                    </span>
                    <div className="card-action right-align" >
                        <button onClick={e => window.location.href="/posts/editpost"}><i className="material-icons black-text">edit</i></button>
                        <button onClick={e => this.props.deletePost(e, this.props.id)}><i className="material-icons black-text">delete</i></button>
                    </div>

                </div>
            </div>
        );
    }
}

export default PostItem;