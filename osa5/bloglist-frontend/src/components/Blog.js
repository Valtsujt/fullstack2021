import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
            <div style={blogStyle}>
                {blog.title} <button onClick={toggleShow}>hide</button> <br />
                {blog.url} <br />
        likes: {blog.likes} <button onClick={() => props.addLike(blog)}>like</button> <br />
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
    addLike: PropTypes.func.isRequired,

}

export default Blog