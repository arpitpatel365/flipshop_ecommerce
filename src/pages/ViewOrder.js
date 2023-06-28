import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/ViewOrder.css'
import { Space, Spin } from 'antd';
import no_order from '../images/no_order.png'
import { cancelOrder, getOrderList } from "../services/ProductService";
import rupee from '../images/rupee.png'
import '../css/ViewOrder.css'

const ViewOrder = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading]=useState(false)
    let navigate = useNavigate()


    const SpinLoad = () => (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >

            <center> <Spin tip="Loading...">
            </Spin>
            </center>
        </Space>
    );

    const handleCancel = ((order_id) => {
        var d1 = window.confirm("Do you really want to cancel this order ?");
        // Swal.fire({

        //     title: 'Are you sure you want to cancel this order?',

        //     showCancelButton: true,
        //     confirmButtonText: 'Save',

        //   }).then((result) => {
        //     /* Read more about isConfirmed, */
        //     if (result.isConfirmed) {

        //     }
        //   })
        if (d1 === true) {

            var e1 = window.prompt("Please provide cancellation reason.", 'NA');

            if (e1 !== null) {
                var d11 = localStorage.getItem("Object");
                var e2 = JSON.parse(d11);

                var e3 = e2.user_id;
                const data = {
                    user_id: e3,
                    order_id: order_id,
                    cancel_reason: e1
                };

                let a = localStorage.getItem("Object");
                let b = JSON.parse(a)
                let c = b.user_id;
                const userID = {
                    user_id: c
                }

                cancelOrder(data)
                    .then((res) => {
                        // handle Success
                        console.log(res);
                        if (res.data.flag === "1") {
                            getOrderList(userID)
                                .then(function (res) {
                                    if (res.data.flag === "1") {
                                        console.log(res)
                                        setData(res.data.order_list);
                                    }
                                })

                                .catch(function (error) {
                                    console.log(error)
                                })
                            // window.alert("Your order is cancelled successfully.")
                        }
                    })

                    .catch(function (res) {
                        // handle error
                        console.log(res);
                    })
            }
        }
    })
    
    useEffect(() => {
        setLoading(true)
        let a = localStorage.getItem("Object");
        if (a === null) {
            window.alert('Please login first.');
            navigate('/signin');

        }

        else {
            const ff = document.getElementById('OkSign')
            const SignUpCheck = document.getElementById('SignAuth')
            ff.style.display = 'none';
            SignUpCheck.style.display = 'none'

            let b = JSON.parse(a)
            let c = b.user_id;
            const data = {
                user_id: c
            }

            getOrderList(data)
                .then(function (res) {
                    if (res.data.flag === "1") {
                        console.log(res)
                        setData(res.data.order_list);
                        setLoading(false)
                    }
                    else{
                        setLoading(false)
                    }
                })

                .catch(function (error) {
                    console.log(error)
                    setLoading(false)
                  
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (

        <React.Fragment>



            <div className="container my-1">

                {loading ?  <h1>{SpinLoad()}</h1> :  
                <>
        
                     {data.length===0 ?    <div className="container text-center">
                            <img src={no_order} className='img-fluid' style={{ width: '650px' }} alt="no order img" />
                            <h5 className="no_order">You have not placed any order yet !</h5>
                        </div> : ""}
                <div>
                   



                        <React.Fragment>
                            {data.length>0 ? 
                            <>
                            <h2>Your orders</h2>   <br />
                            <div className="table-responsive">

                                <table className="">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr. No.</th>
                                            <th scope="col">Order date</th>
                                            <th scope="col">Order status</th>
                                            <th scope="col">Total amount (Rs.)</th>
                                            <th scope="col">Consignee name</th>
                                            <th scope="col">Consignee address</th>
                                            <th scope="col">Consignee mobile number</th>
                                            <th scope="col">Payment method</th>
                                            <th scope="col">Order details</th>

                                        </tr>
                                    </thead>
                                    { data?.length>0 && data?.map((item, index) =>
                                        <tbody key={item.order_id} >
                                            <tr >

                                                <th scope="row"> {index + 1} </th>
                                                <td> {item.order_date} </td>
                                                <td> <b className={item.order_status==="Cancelled" ? "Cancelled_order" : "pending_order"}>  {item.order_status}</b> </td>
                                                <td> <b><img src={rupee} alt="error" /> {item.total_amount} </b></td>
                                                <td>{item.shipping_name}</td>
                                                <td>{item.shipping_address} </td>
                                                <td>{item.shipping_mobile}</td>
                                                <td> {item.payment_method} </td>

                                                <td>

                                                    {item.order_details.map((element, index) =>

                                                        <div key={`${element}_${index}`} className='ok'>
                                                            {index !== 0 ?
                                                                <React.Fragment >
                                                                    <img src={element.product_image} alt="error" style={{ width: '100px' }} /> <br />
                                                                    <b>{element.product_name} </b>  <br />
                                                                    Price : <b> {element.product_price}Rs. </b><br />
                                                                    Quantity : <b> {element.product_qty}</b>
                                                                </React.Fragment>
                                                                : ""}
                                                        </div>

                                                    )
                                                    }



                                                    {item.order_status === 'Cancelled' ? "" :
                                                        <>

                                                            <button className="my-1 btn btn-outline-danger" onClick={() => handleCancel(item.order_id)}>Cancel</button>
                                                            <br />
                                                        </>
                                                    }

                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                    }


                                </table>
                            </div> 
                            </> :"" }
                        </React.Fragment>

                     




                </div>
               
                <br />
                </>
                    }

            </div>
        </React.Fragment>
    );
}

export default ViewOrder;


















