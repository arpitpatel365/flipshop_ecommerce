
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const LogOut = () => {

    const navigate=useNavigate();

     useEffect(() => {
        const obj=localStorage.getItem('Object')
        console.log(obj)
        
        let a=window.confirm('Are you sure, you want to Log Out ?')
        if(a===true){
            localStorage.removeItem('Object')
            navigate('/ProductList')
        }

        else{
            
        }

      return () => {}
    }, [navigate])
    

    return (
        <React.Fragment>
        
        </React.Fragment>
    )
}
