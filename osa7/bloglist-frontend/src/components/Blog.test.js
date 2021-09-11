import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let mockHandler
    beforeEach(() => {
        mockHandler = jest.fn()
        component = render(
            <Blog blog={{
                title: 'title of blog',
                author: 'author of blog',
                url:'url of blog',
                likes:15
            }} addLike={mockHandler} deleteBlog={() => undefined} />
        )
    })

    test('renders title and author', () => {
        expect(component.container).toHaveTextContent(
            'title of blog'
        )
        expect(component.container).toHaveTextContent(
            'author of blog'
        )
        expect(component.container).not.toHaveTextContent(
            'url of blog'
        )
        expect(component.container).not.toHaveTextContent(
            'likes: 15'
        )
    })
    test('renders url and likes after view is clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        expect(component.container).toHaveTextContent(
            'title of blog'
        )
        expect(component.container).toHaveTextContent(
            'author of blog'
        )
        expect(component.container).toHaveTextContent(
            'url of blog'
        )
        expect(component.container).toHaveTextContent(
            'likes: 15'
        )
    })

    test('function given to the component is called when button is clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const addLikeButton = component.getByText('like')
        fireEvent.click(addLikeButton)
        fireEvent.click(addLikeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})