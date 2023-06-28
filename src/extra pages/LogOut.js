
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <React.Fragment>
        
        </React.Fragment>
    )
}
