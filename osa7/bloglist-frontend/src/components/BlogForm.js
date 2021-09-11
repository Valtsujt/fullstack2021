import React, { useState } from 'react'

import { createNewBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        setTitle('')
        setAuthor('')
        setUrl('')
        props.createNewBlog(author, title, url, props.user.user)
    }
    return (
        <div>
            <h2>Create new</h2>
            <form>
                title: <input value={title} key="title" onChange={(event) => setTitle(event.target.value)} />
                <p />
                author: <input value={author} key="author" onChange={(event) => setAuthor(event.target.value)} />

                <p />
                url <input value={url} key="url" onChange={(event) => setUrl(event.target.value)} />
                <p />
                <button id="create-blog" onClick={createBlog}>create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {
    createNewBlog,
}
const ConnectedBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm
