import React, { useState }from 'react'
import {
    useParams,
} from 'react-router-dom'
import { deleteBlog, voteBlog,addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const BlogInfo = (props) => {
    const id = useParams().id
    const blog = props.blogs.find(blog => blog.id === id)
    const [comment, setComment] = useState('')
    if (!blog) {
        return null
    }


    const deleteButton = () => {
        if (props.user.loggedUsername === blog.user.username) {
            return (
                <button onClick={() => props.deleteBlog(blog, props.user.user)}>Delete</button>
            )
        }

    }
    const commentList = () => {
        console.log(blog)
        if (!blog.comments) {
            console.log('no comments')
            return null
        }
        return (
            <div>
                {  blog.comments.map((comment, key) => {
                    console.log(comment)
                    return (
                        <p key={key}>{comment}</p>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="blog-div">
            <h2>{blog.title} </h2> <br />
            <a href={blog.url} >{blog.url}</a> <br />
                likes: {blog.likes} <button id="like-button" onClick={() => props.voteBlog(blog, props.user.user)}>like</button> <br />
            <p>added by {blog.author}</p> <br />
            {deleteButton()}
            <h2>comments</h2>
            <input key="comment" onChange={(event) => setComment(event.target.value)} />
            <button onClick={() => props.addComment(blog.id, comment, props.user.user)}>add comment</button>
            {commentList()}

        </div>
    )


}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}
const mapDispatchToProps = {
    deleteBlog,
    voteBlog,
    addComment
}
const ConnectedBlogInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogInfo)

export default ConnectedBlogInfo