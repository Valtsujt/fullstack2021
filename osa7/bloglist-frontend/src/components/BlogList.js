
import { connect } from 'react-redux'
import Blog from './Blog'
import React from 'react'
const BlogList = (props) => {
    return (
        <div className='BlogList'>
            {
                props.blogs.sort((a, b) => {
                    if (b.likes > a.likes) return 1
                    if (a.likes > b.likes) return -1
                    return 0
                }).map(blog => {

                    return (
                        <Blog key={blog.id} blog={blog} />
                    )

                })
            }
        </div>)
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}
const ConnectedBlogList = connect(
    mapStateToProps,
)(BlogList)

export default ConnectedBlogList
