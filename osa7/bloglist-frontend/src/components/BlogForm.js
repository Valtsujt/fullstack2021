import React, { useState } from 'react'

import { createNewBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
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
                <div>
                    <TextField label="title" value={title} key="title" onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <TextField label="author" value={author} key="author" onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    <TextField label="url" value={url} key="url" onChange={(event) => setUrl(event.target.value)} />
                </div>
                <Button variant="contained" color="primary" id="create-blog" onClick={createBlog}>create</Button>
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
