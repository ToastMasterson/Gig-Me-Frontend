import React, { Fragment } from 'react'
import { useAuth0 } from '../react-auth0-wrapper'

const ArtistHome = () => {
    const { loading, user } = useAuth0()
    
    console.log(user)

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