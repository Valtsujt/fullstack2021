import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import {
    TableRow,
    TableCell,
    Link
} from '@material-ui/core'
const Blog = (props) => {
    const blog = props.blog

    return (
        <TableRow>
            <TableCell>
                <Link color="inherit" component={RouterLink} to={'/blogs/' + blog.id}>{blog.title}</Link>
            </TableCell>
        </TableRow>
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
