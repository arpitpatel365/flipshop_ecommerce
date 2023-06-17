import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { AddProductCart, GetProductdetails } from '../services/ProductService';
import Swal from 'sweetalert2';
import '../css/ProductDetails.css'
import rupee from '../images/rupee.png'
import '../css/Common.css'

function ProductDetails() {
    let { id } = useParams();
    // let uid=localStorage.getItem('id');
    const [productdetails, setProductdetails] = useState([]);

    useEffect(() => {

        let obj = localStorage.getItem('Object')
        let ff = document.getElementById('OkSign')
        let SignUpCheck = document.getElementById('SignAuth')
        let Out = document.getElementById('logOut')

        if (obj !== null) {
            ff.style.display = 'none'
            SignUpCheck.style.display = 'none'
            Out.style.display = 'block'
        }

        else {
            ff.style.display = 'block'
            SignUpCheck.style.display = 'block'
            Out.style.display = 'none'
        }

        GetProductdetails(id)
            .then((res) => {
                console.log(res)
                setProductdetails(res.data.product_list);
            })
            .catch((error) => {
                console.log(error)
            })

        return () => { }
    }, [id])

    const cartAdd = (product_id) => {
        let a1 = localStorage.getItem('Object')

        if (a1 == null) {
            // Swal.fire('Kindly login first in order to place order.')
            Swal.fire('Kindly login first in order to place order.');
        }
              
        else {
            var b1 = JSON.parse(a1);
            var c1 = b1.user_id;

            const data = {
                user_id: c1,
                product_id: product_id,
                product_qty: 1
            }

            AddProductCart(data)
                .then((res) => {
                    console.log(res);
                    if (res.data.flag === "0") {
                        Swal.fire('','This product already exists in your cart !','info')
                    }

                    if (res.data.flag === "1") {
                        Swal.fire('',"Product is successfully added to cart.","success")
                    }
                })
                        
                .catch((res) => {
                    console.log(res)
                });
        }
    }

    return (
        <React.Fragment>
            <br />
            <ul>  {productdetails.map((item) =>
                <div key={item.product_id}> <h6>{item.product_name}</h6> 
                    <img src={item.product_image} alt='error' style={{ width: '200px' }} /> <br />
                    Price : <b>{item.product_price} </b> <img src={rupee} alt='rupee logo'/> <br />
                    Description : {item.product_details} <br /> <br />

                    <Button className='commonBtn' variant="info" onClick={() => { cartAdd(item.product_id) }}>Add to cart</Button>{' '}


                </div>
            )}
            </ul>
            
        </React.Fragment>
    );
}

export default ProductDetails;








