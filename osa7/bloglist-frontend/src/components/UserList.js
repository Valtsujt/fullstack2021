
import { connect } from 'react-redux'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Table,
    TableContainer,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Link
} from '@material-ui/core'
const UserList = (props) => {
    const blogsToAuthor = (blogs) => {
        const ar = blogs.reduce(function (rv, x) {
            (rv[x['user']['id']] = rv[x['user']['id']] || []).push(x)
            return rv
        }, {})

        console.log(ar)
        return (

            <TableContainer component={Paper}>
                <Table className='BlogList'>
                    <TableBody>
                        <TableRow>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                                blogs created
                            </TableCell>
                        </TableRow>
                        {Object.keys(ar).map((key) => {
                            console.log(key)
                            console.log(ar[key])
                            console.log(ar[key].length)
                            return (
                                <TableRow key={key}>
                                    <TableCell>  <Link color="inherit" component={RouterLink} to={'/users/' + ar[key][0].user.id}>{ar[key][0].user.name}</Link></TableCell>
                                    <TableCell>{ar[key].length}</TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
            </TableContainer>)




    }

    return (
        <div>
            <h3>Users</h3>
            <div className='UserList'>
                {blogsToAuthor(props.blogs)}
            </div>

        </div>)
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
}
const ConnectedUserList = connect(
    mapStateToProps,
)(UserList)

export default ConnectedUserList
