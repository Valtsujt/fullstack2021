import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {
    const blog = props.blog
    const [show, setShow] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const toggleShow = () => {
        setShow(!show)
    }

    const deleteButton = () => {
        if (props.deleteBlog) {
            return (
                <button onClick={() => props.deleteBlog(blog)}>Delete</button>
            )
        }

    }
    if (show) {
        return (
            <div className="blog-div" style={blogStyle}>
                {blog.title} <button onClick={toggleShow}>hide</button> <br />
                {blog.url} <br />
                likes: {blog.likes} <button id="like-button" onClick={() => props.voteBlog(blog, props.user.user)}>like</button> <br />
                {blog.author} <br />
                {deleteButton()}
            </div>
        )
    } else {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author} <button onClick={() => toggleShow(blog)}>view</button>
            </div>
        )
    }

}

Blog.propTypes = {
    deleteBlog: PropTypes.func.isRequired,
    voteBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {
    deleteBlog,
    voteBlog,
}
const ConnectedBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)

export default ConnectedBlog
