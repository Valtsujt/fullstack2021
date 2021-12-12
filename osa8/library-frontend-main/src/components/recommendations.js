
import React, { useEffect } from 'react'
import { useState } from 'react'

import { ALL_BOOKS, FAVGENRE } from '../queries'
import { useLazyQuery } from '@apollo/client';

const Recommendations = (props) => {
    const [getGenre, { loadingg }] = useLazyQuery(FAVGENRE, {
        fetchPolicy: "network-only"
    })
    const [getBooks, { loading}] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: "network-only"
    });
    const [books, setBooks] = useState([])
    useEffect(() => {
        console.log("useeffect called")

        setBooks([])
        const fetch = async () => {
            console.log("1")
            let response = await getGenre()
            console.log("2")
            console.log(response)
            if (response.data.me) {

                let response2 = await getBooks({ variables: { genre: response.data.me.favoriteGenre } })
                console.log("3")
                console.log("setbooks")
                console.log(response2)
                setBooks(response2.data.allBooks)
            }
        }
        fetch()


    }, [props.show]) // eslint-disable-line
    if (!props.show) {
        return null
    }



    if (loadingg) {
        return <div>loading...</div>
    }


    if (loading) {
        return <div>loading...</div>
    }
    console.log(books)
    if (!books) return null
    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {books.map(a => {
                        return (<tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>)

                    }

                    )}
                </tbody>
            </table>

        </div>
    )
}

export default Recommendations