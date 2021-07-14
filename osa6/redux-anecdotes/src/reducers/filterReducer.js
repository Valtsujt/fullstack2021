const notificationReducer = (state = "", action) => {
    

    if (action.type === 'FILTER') {
        return action.filter
    } 
     return state
}

export const addFilter = filter => {
    return {
        type: 'FILTER',
        filter: filter
    }
}


export default notificationReducer