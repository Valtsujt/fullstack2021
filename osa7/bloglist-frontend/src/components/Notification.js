
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    // const style = {
    //     border: 'solid',
    //     padding: 10,
    //     borderWidth: 1
    // }
    if (props.notification) {
        let type = 'notification'
        console.log(props)
        console.log(props.error)
        if(props.error) {
            type = 'error'
        }
        return (
            <div className={type}>
                {props.notification}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        notification: state.notification.notification,
        error: state.notification.error
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification