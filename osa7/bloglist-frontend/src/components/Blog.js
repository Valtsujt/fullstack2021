import React from 'react'
import { Link } from 'react-router-dom'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {
    const blog = props.blog

    return (
        <p><Link to={'/blogs/' + blog.id}>{ blog.title}</Link></p>
    )


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
