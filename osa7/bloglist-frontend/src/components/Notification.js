
import React from 'react'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'
const Notification = (props) => {
    // const style = {
    //     border: 'solid',
    //     padding: 10,
    //     borderWidth: 1
    // }
    let type = 'success'
    console.log(props)
    console.log(props.error)
    if (props.error) {
        type = 'error'
    }
    return (
        <div>
            {(props.notification &&
                <Alert severity={type}>
                    {props.notification}
                </Alert>
            )}
        </div>)


}

const mapStateToProps = (state) => {
    return {
        notification: state.notification.notification,
        error: state.notification.error
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification