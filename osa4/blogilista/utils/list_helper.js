const dummy = (blogs) => {

    return 1
}




const totalLikes = (list) => {
    return list.reduce((s, p) => {
        return s + p.likes
    }, 0)
}


const favoriteBlog = (list) => {
    let title = ""
    let autho = ""
    let likes = 0

    list.forEach((blog) => {
        if (blog.likes > likes) {
            title = blog.title
            autho = blog.author
            likes = blog.likes
        }
    })

    return ({
        title: title,
        author: autho,
        likes: likes
    })

}


const mostBlogs = (list) => {

    const objectWithNames= {}
    
    list.forEach((blog) => {
        if(blog.author in objectWithNames) {
            objectWithNames[blog.author] =  objectWithNames[blog.author] + 1
        } else {
            objectWithNames[blog.author] = 1
        }
    })

    let biggest = 0
    let author = ""
    for (let name in objectWithNames) {
        if(objectWithNames[name] > biggest) {
            biggest = objectWithNames[name]
            author = name
        }
    }
    return ({
        author:author,
        blogs: biggest
    })
}


const mostLikes = (list) => {

    const objectWithNames= {}
    
    list.forEach((blog) => {
        if(blog.author in objectWithNames) {
            objectWithNames[blog.author] =  objectWithNames[blog.author] + blog.likes
        } else {
            objectWithNames[blog.author] = blog.likes
        }
    })

    let biggest = 0
    let author = ""
    for (let name in objectWithNames) {
        if(objectWithNames[name] > biggest) {
            biggest = objectWithNames[name]
            author = name
        }
    }
    return ({
        author:author,
        likes: biggest
    })
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}