import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

export default function Navbar() {
    let navigate = useNavigate()
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const handleOut = () => {
        // setIsNavExpanded(!isNavExpanded)
        let ask = window.confirm('Are you sure, do you want to Log Out ?')
        if (ask === true) {
            localStorage.removeItem('Object')
            localStorage.removeItem('user_email')
            navigate('/')
            window.location.reload()
            setIsNavExpanded(!isNavExpanded)
        }
    }
            
    const handleClick = () => {
        setIsNavExpanded(!isNavExpanded);

    }

    const LinkClick = () => {
        setIsNavExpanded(!isNavExpanded);
        setIsNavExpanded(false)

    }

    const ProductList = () => {
        if (window.innerWidth <= parseInt('658px')) {

            setIsNavExpanded(!isNavExpanded)
        }

    }



    return (
        <React.Fragment>
            <nav className='navigation'>
                <Link to="/" className="brand-name" onClick={() => LinkClick()}>
                    Flipshop
                </Link>
                <button
                    id='hide_carousel'
                    className="hamburger"
                    onClick={() => {
                        handleClick()

                    }}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div
                    className={
                        isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                    }
                >

                    <ul>
                        <li><Link to='/productlist' onClick={ProductList}> Products</Link></li>
                        <Link to='/productdetails'></Link>
                        <li id='SignAuth'><Link to='/signup' onClick={() => {
                            if (window.innerWidth <= parseInt('658px')) {
                                setIsNavExpanded(!isNavExpanded)
                            }
                        }}>Sign Up</Link></li>
                        <li id='OkSign'><Link to='/signin' onClick={() => {
                            if (window.innerWidth <= parseInt('658px')) {
                                setIsNavExpanded(!isNavExpanded)
                            }
                        }}>Sign In</Link></li>
                        <li><Link to='/viewcart' onClick={() => {
                            if (window.innerWidth <= parseInt('658px')) {
                                setIsNavExpanded(!isNavExpanded)
                            }
                        }}>View Cart</Link></li>
                        <Link to='/forgot-password'></Link>

                        <Link to='/placeorder' ></Link>
                        <li><Link to='/vieworder' onClick={() => {
                            if (window.innerWidth <= parseInt('658px')) {
                                setIsNavExpanded(!isNavExpanded)
                            }
                        }}>View Order</Link></li>
                        <li> <Link to='/profile' onClick={() => {
                            if (window.innerWidth <= parseInt('658px')) {
                                setIsNavExpanded(!isNavExpanded)
                            }
                        }}>Profile</Link></li>

                        <li id='logOut'>  <button className='logOutButton commonBtn btn btn-danger' onClick={() => {
                            handleOut()
                        }}
                        >
                            Logout</button> </li>
                        <Link to='/update-profile'></Link>
                        <Link to='/change-password'></Link>

                    </ul>


                </div>
            </nav>
        </React.Fragment>
    );
}


