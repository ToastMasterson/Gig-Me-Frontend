import React, { Fragment } from 'react'
import { useAuth0 } from '../react-auth0-wrapper'

const ArtistHome = () => {
    const { loading, user } = useAuth0()
    
    console.log(user.nickname)

    fetch(`http://localhost:3001/api/artists/${user.nickname}`)
    .then(res => res.json()).then(artist => console.log(artist))

    if (loading || !user ) {
        return (
            <div>Loading...</div>
        )
    }

    return(
        <Fragment>
            <div>Feed</div>
        </Fragment>
    )
}

export default ArtistHome