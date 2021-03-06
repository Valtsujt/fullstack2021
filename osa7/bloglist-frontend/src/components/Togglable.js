import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'
const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="contained" color="default" className="togglebutton" onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button color="secondary" onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
}
Togglable.prototypes = {
    buttonLable: PropTypes.string.isRequired
}
export default Togglable