describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
        const user = {
            name: 'testi kayttaja',
            username: 'testi',
            password: 'salasana1'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('log in')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input:first').type('testi')
            cy.get('input:last').type('salasana1')
            cy.contains('log in').click()
            cy.contains('Blogs')
            cy.contains('testi kayttaja logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('input:first').type('testi2')
            cy.get('input:last').type('salasana3')
            cy.contains('log in').click()
            cy.get('.error').should('contain', 'invalid username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.contains('Log in to application')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'testi', password: 'salasana1'
            }).then(response => {
                localStorage.setItem('user', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('input:first').type('title22')
            cy.get('input').eq(1).type('author33')
            cy.get('input:last').type('url44')
            cy.get('#create-blog').click()
            cy.contains('title22')
            cy.contains('view').click()
            cy.contains('likes: 0')
            cy.contains('Delete')
        })
        it('A blog can be liked', function () {
            cy.contains('create new blog').click()
            cy.get('input:first').type('title22')
            cy.get('input').eq(1).type('author33')
            cy.get('input:last').type('url44')
            cy.get('#create-blog').click()
            cy.contains('view').click()
            cy.contains('likes: 0')
            cy.get('#like-button').click()
            cy.contains('likes: 1')

        })
        it('A blog can be deleted', function () {
            cy.contains('create new blog').click()
            cy.get('input:first').type('title22')
            cy.get('input').eq(1).type('author33')
            cy.get('input:last').type('url44')
            cy.get('#create-blog').click()
            cy.contains('view').click()
            cy.contains('title22')
            cy.contains('url44')
            cy.contains('Delete').click()
            cy.on('window:confirm', () => {
                return true
            })
            cy.contains('url44').should('not.exist')
        })
        it('A blogs should be in correct order', function () {
            cy.contains('create new blog').click()
            cy.get('input:first').type('title22')
            cy.get('input').eq(1).type('author33')
            cy.get('input:last').type('url44')
            cy.get('#create-blog').click()
            cy.contains('view').click()
            cy.get('input:first').type('title55')
            cy.get('input').eq(1).type('author66')
            cy.get('input:last').type('url77')
            cy.get('#create-blog').click()
            cy.contains('view').click()
            cy.contains('url44').find('#like-button').click()
            cy.get('.blog-div').eq(0).contains('url44')
            cy.get('.blog-div').eq(1).contains('url77')
            cy.contains('url77').find('#like-button').click()
            cy.wait(1000)
            cy.contains('url77').find('#like-button').click()
            cy.wait(1000)
            cy.get('.blog-div').eq(1).contains('url44')
        })
    })
})