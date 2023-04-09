import axios from "axios";
import React from "react";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignInOld() {
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleSubmit = (e) => {


        e.preventDefault();

        if (user_email == "" || user_email == undefined) {
            window.alert('Please enter your registered email address.')
        }

        else if (user_password == "" || user_password == undefined) {
            window.alert('Please enter your password.')
        }

        else {
            let formData = new FormData();
            formData.append('user_email', user_email);
            formData.append('user_password', user_password);
            axios.post('https://akashsir.in/myapi/ecom1/api/api-login.php', formData)
                .then(function (res) {
                    console.log(res.data);
                    if (res.data.flag == 1) {

                        localStorage.setItem('user_email', user_email);
                        localStorage.setItem('user_password', user_password);

                        localStorage.setItem('Object', JSON.stringify(res.data))
                        alert('Login Successful.')
                        navigate('/viewcart');

                    }
                    else {
                        alert('You have entered incorrect email address or password. Please enter correct email address and password.');
                        setEmail("");
                        setPassword("")
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }

    const handleForgot = () => {
        navigate('/forgot-password')
    }

    return (
        <React.Fragment>
            <br />
            <h2>Sign In</h2> <br />
            <form onSubmit={handleSubmit}>
                Email : <input type='text' name="user_email" onChange={(e) => { setEmail(e.target.value) }} value={user_email} /> <br /><br />
                Password : <input type='password' value={user_password} name="user_password" onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                <input type='submit' />
            </form><br />

            <input type='button' onClick={handleForgot} value='Forgot Password ?' /> <br /><br />
            New user ?  <Link to='/signup'>Click Here </Link>
        </React.Fragment>
    );
}

export default SignInOld;