
import { connect } from 'react-redux'
import React from 'react'
import {
    useParams,
} from 'react-router-dom'
const UserInfo = (props) => {
    const userId = useParams().id
    if (props.blogs.length < 1) {
        return null
    }
    console.log(props.blogs)
    const user = props.blogs.find(blog => blog.user.id === userId).user
    console.log(user)
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {props.blogs.filter((blog) => {
                return (blog.user.id === userId)
            }).map((blog) => {
                return (
                    <p key={blog.title}>{blog.title}</p>
                )
            })}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}
const ConnectedUserInfo = connect(
    mapStateToProps,
)(UserInfo)

export default ConnectedUserInfo
