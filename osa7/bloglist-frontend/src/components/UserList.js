
import { connect } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
const UserList = (props) => {
    const blogsToAuthor = (blogs) => {
        const ar = blogs.reduce(function (rv, x) {
            (rv[x['user']['id']] = rv[x['user']['id']] || []).push(x)
            return rv
        }, {})

        console.log(ar)
        return (

            <table>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {  Object.keys(ar).map((key) => {
                    console.log(key)
                    console.log(ar[key])
                    console.log(ar[key].length)
                    return (
                        <tr key={key}>
                            <th> <Link to={'/users/' + ar[key][0].user.id}>{ar[key][0].user.name}</Link></th>
                            <th>{ar[key].length}</th>
                        </tr>
                    )

                })}
            </table>



        )
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
