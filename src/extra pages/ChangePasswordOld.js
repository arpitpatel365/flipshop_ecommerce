
import axios from 'axios';
import React, { useState } from 'react'

const ChangePasswordOld = () => {
    const [opass, setOpass] = useState('');
    const [npass, setNpass] = useState('');
    const [cpass, setCpass] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        var a = localStorage.getItem("Object");
        // console.log(a);
        var b = JSON.parse(a);
        // console.log(b)
        var c = b.user_id;
        // console.log(c);

        // we can also directly get old password from local storage like this.
        // var s = localStorage.getItem("user_password");
        // console.log(s);

        if (opass === "") {
            window.alert("Please enter your old password.")
        }
        else if (npass === "") {
            window.alert("Please enter your new password.")
        }
        else if (cpass === "") {
            window.alert("Please enter your confirm password.")
        }


        else {
            if (npass === cpass) {



                const n1 = {
                    user_id: c,
                    opass: opass,
                    npass: npass,
                    cpass: cpass
                };

                console.log(n1)
                axios({
                    method: "post",
                    url: "https://akashsir.in/myapi/ecom1/api/api-change-password.php",
                    data: n1,
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then((res) => {
                        // handle Success
                        console.log(res);
                        if (res.data.flag == 1) {
                            console.log("Password changed");
                            setNpass(npass);
                            localStorage.setItem("user_password", npass);
                            window.alert("Password is changed successfully.");
                            setOpass("");
                            setNpass("");
                            setCpass("");
                        }
                        else {
                            window.alert("Old password is incorrect.")
                            setOpass("")
                        }
                    })
                    .catch((res) => {
                        // handle error
                        console.log(res)
                    })

            }
            else {
                window.alert("New password and confirm password must be same.");
                setNpass("");
                setCpass("");
            }
        }
    }

    return (
        <React.Fragment>
            <br />
            <h2>Change Password</h2>  <br />
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='password' name='opass' onChange={(e) => { setOpass(e.target.value) }} placeholder='Old Password' value={opass} /> <br /><br />
                <input type='password' name='npass' onChange={e => setNpass(e.target.value)} placeholder='New Password' value={npass} />
                <br /><br />
                <input type='password' name='cpass' onChange={(e) => { setCpass(e.target.value) }} placeholder='Confirm Password' value={cpass} />
                <br /><br />

                <input type='submit' />

            </form>
        </React.Fragment>
    )
}

export default ChangePasswordOld





