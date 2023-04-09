import axios from "axios";
import React from "react";
import { useState } from 'react';

function ForgotPasswordOld() {
    const [email, setEmail] = useState('');

    const handleClick = () => {
        //    console.log(email);
        setEmail('');
        var a = localStorage.getItem("user_email");
        console.log(a);

        const g1 = {
            user_email: email
        };

        if (email == "") {
            window.alert("Please enter your registered email address.")
        }

        else {
            axios({
                method: "post",
                url: "https://akashsir.in/myapi/ecom1/api/api-forgot-password.php",
                data: g1,
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((res) => {
                // handle success
                console.log(res);
                if (res.data.flag == 1) {
                    var a = res.data.message;
                    console.log("Password sent on email" + a);
                    window.alert("Password is sent on registered email id.");
                }
                else {
                    alert('You have entered incorrect email address. Please enter correct email address.')
                    setEmail("")

                }
            })
            .catch((res) => {
                console.log(res);

            })

        }
    }
    return (
        <React.Fragment>
            <br />
            <h2>Enter your registered email id to get your password.</h2>   <br />
            <input type='email' name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your registered email' value={email} /> <br /> <br />

            <button onClick={handleClick}>Get my password</button>

        </React.Fragment>
    );
}

export default ForgotPasswordOld;



