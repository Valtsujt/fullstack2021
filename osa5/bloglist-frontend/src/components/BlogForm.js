import React, { useState } from 'react'
const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
                <button id="create-blog" onClick={(event) => {
                    createBlog(event, author, title, url)
                    setTitle('')
                    setAuthor('')
                    setUrl('')
                }}>create</button>
            </form>
        </div>
    )
}

export default BlogForm