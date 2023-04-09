import axios from "axios";
import React, { useState } from "react";

function PlaceOrderOld() {
    const [user, setUser] = useState({
        shipping_name: "",
        shipping_mobile: "",
        shipping_address: "",
        payment_method: ""
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let a1 = localStorage.getItem("Object");
        // console.log(a1);
        let a2 = (JSON.parse(a1));
        let a3 = (a2.user_id)
        let a = user.shipping_name;
        let b = user.shipping_mobile;
        let c = user.shipping_address;
        let d = user.payment_method;

        console.log(`${a3} ${a} ${b} ${c} ${d}`);

        if(user.shipping_name==""){
            window.alert('Kindly enter consignee name.')
        }

        else if(user.shipping_mobile==""){
            window.alert('Kindly enter 10 digit mobile number of consignee. ')
        }

        else if(user.shipping_address==""){
            window.alert('Kindly enter full address of consignee. ')
        }

        else if(user.payment_method==undefined || user.payment_method==""){
            window.alert('Kindly select payment method.')
        }

        else {

        const f1 = {
            user_id: a3,
            shipping_name: a,
            shipping_mobile: b,
            shipping_address: c,
            payment_method: d

        };

        //    axios.post('https://akashsir.in/myapi/ecom1/api/api-add-order.php',f1)
        axios({
            method: "post",
            url: "https://akashsir.in/myapi/ecom1/api/api-add-order.php",
            data: f1,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                // handle success
                console.log(res)
                window.alert("Your order is successfully placed.")
            })
            .catch((res) => {
                // handle error
                console.log(res);
            })
        }
    }

    return (
        <React.Fragment>
            <h2>Place your order</h2>

            <form onSubmit={handleSubmit}>
                <input type='text' name="shipping_name" onChange={handleChange} placeholder='Consignee name' /> <br /> <br />
                <input type='text' name="shipping_mobile" onChange={handleChange} placeholder='Mobile number    ' /> <br /> <br />
                <textarea name="shipping_address" onChange={handleChange} placeholder='Consignee Address' cols='45' rows='6' />  <br /> <br />


                Payment mode&nbsp; :&nbsp;  <label htmlFor='cod'>Cash on delivery </label> <input type='radio' name='payment_method' value='COD' id="cod" onChange={handleChange} />  &nbsp;
                <label htmlFor='gpay'>  Gpay </label><input type='radio' id="gpay" name='payment_method' value='Gpay' onChange={handleChange} />  &nbsp;
                <label htmlFor='paytm'>   Paytm </label> <input type='radio' id="paytm" name='payment_method' value='Paytm' onChange={handleChange} /> &nbsp;
                <label htmlFor='wallet'> Wallet </label> <input type='radio' id="wallet" name='payment_method' value='Wallet' onChange={handleChange} /> <br /> <br />

                <input type='submit' value='Place Order' />

            </form>

        </React.Fragment>
    );
}

export default PlaceOrderOld;