import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Space, Spin } from 'antd';
import Button from 'react-bootstrap/Button';
import empty_cart from '../images/empty_cart.jpg'
import { DeleteProduct, getCartList } from '../services/ProductService';
import Swal from 'sweetalert2';

const ViewCart = () => {
    let navigate = useNavigate();
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [loaded, setLoaded] = useState(false)
    
    const SpinLoad = () => (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >
            <center>
                <Spin tip="Loading...">
                </Spin>
            </center>
        </Space>
    );


    const handleDelete = (cart_id) => {
        const a = localStorage.getItem("Object");
        let b = JSON.parse(a);
        let c = (b.user_id);

        const userID = {
            user_id: c
        };
       
        Swal.fire({
            title: 'Are you sure you want to remove this product ?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        })

        .then((result) => {
            /* Read more about isConfirmed below */
            if (result.isConfirmed) {
                let data = {
                    cart_id: cart_id
                };

                DeleteProduct(data)
                    .then((res) => {
                        console.log(res);
                        
                        if (res.data.flag === "1") {
                            getCartList(userID)
                            .then((res) => {
                                console.log(res)
                                console.log(res);
                                setData1(res.data.cart_list)
                                setData2(res.data.total_qty);
                                setData3(res.data.grand_total)
                                setLoaded(true)
                            })
                            .catch((error) => {
                                console.log(error);
                                setLoaded(true)
                            })
                        }
                    })
                    
                    .catch((error) => {
                        //handle error
                        console.log(error)
                    })
            }
        })
    }

    useEffect(() => {
        const Out = document.getElementById('logOut')
        const ff = document.getElementById('OkSign')
        ff.style.display = 'none'
        const a = localStorage.getItem("Object");
        let SignUpCheck = document.getElementById('SignAuth')

        if (a == null) {
            Out.style.display = 'none'
            alert('Please login first.')
            // console.log('Login First')
            navigate('/signin')
        }

        else {
            Out.style.display = 'block'
            SignUpCheck.style.display = 'none'
            let b = JSON.parse(a);
            let c = (b.user_id);

            const data = {
                user_id: c
            };

            getCartList(data)
                .then((res) => {
                    console.log(res);
                    setData1(res.data.cart_list)
                    setData2(res.data.total_qty);
                    setData3(res.data.grand_total)
                    setLoaded(true)
                })

                .catch((error) => {
                    console.log(error)
                    setLoaded(true)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <br />
            {!loaded ? <h1>{SpinLoad()}</h1> :
                <>
                    {(!data1) ?
                        <div className='container text-center'>
                            <img src={empty_cart} style={{ width: '55vh' }} className="img-fluid" alt="error" />
                            <h3>Cart is empty !</h3> <br />
                            <Link to='/productlist'><h3> Place your first order.</h3></Link>

                        </div>
                        :
                        <>
                            <h3>Products in your cart</h3>


                            <ul>  {data1 && data1.map((item) =>
                                <div key={item.product_id}> <br />
                                    {/* {item.cart_id}  <br/> */}
                                    {item.product_name} <br />
                                    <img src={item.product_image} alt='error' style={{ width: '200px' }} /> <br />
                                    Price : {item.product_price} <br />
                                    Quantity : {item.product_qty} <br />

                                    <Button variant="danger" onClick={() => { handleDelete(item.cart_id) }} >Delete Product</Button>{' '}


                                </div>
                            )} <br />

                                Total Products : {data2} <br />
                                Grand Total : {data3}  <br /> <br />
                                <Link to='/placeorder'> <Button variant="success">Place an order</Button>{' '}</Link>
                            </ul>
                        </>
                    }
                </>
            }

        </React.Fragment>
    )
}

export default ViewCart;




















