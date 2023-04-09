import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const navigate=useNavigate()
    return (
        <React.Fragment>
            ErrorPage
            <br/><br/>
            <button onClick={()=>{navigate('/')}}>Go Back</button>
        </React.Fragment>
    )
}

export default ErrorPage;