import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Space, Spin } from 'antd';
// import styles from '../css/ProductList.module.css'
import Button from 'react-bootstrap/Button';
import rupee from '../images/rupee.png'
import '../css/ProductList.css';
import Img1 from '../images/Img1.jpg'
import Img2 from '../images/Img2.jpg'
import Img3 from '../images/Img3.jpg'
import Img4 from '../images/Img4.jpg'
import Img5 from '../images/Img5.jpg'
import Img6 from '../images/Img6.jpg'
import Img7 from '../images/Img7.jpg'
import { ShowAllProducts } from '../services/ProductService';
import '../css/Common.css'

export const ProductList = () => {

    const [data, setData] = useState('')
    const [isLoaded, setIsLoaded] = useState(true)
    const fDeliveryProduct = [8, 11, 14, 18, 19, 20, 21, 25, 28, 30, 32, 33]

    const SpinLoad = () => (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >

            <center><Spin tip="Loading...">
            </Spin>
            </center>
        </Space>
    );


    useEffect(() => {
        const id = localStorage.getItem('Object')
        const ff = document.getElementById('OkSign')
        const SignUpCheck = document.getElementById('SignAuth')
        const Out = document.getElementById('logOut')

        if (id == null) {

            Out.style.display = 'none';
            ff.style.display = 'block'
            SignUpCheck.style.display = 'block'

            ShowAllProducts()
                .then((res) => {
                    console.log(res);
                    setData(res.data.product_list);
                    setIsLoaded(false)
                })

                .catch((error) => {
                    console.log(error)
                    setIsLoaded(false)
                })

        }

        else {
            ff.style.display = 'none'
            SignUpCheck.style.display = 'none'
            Out.style.display = 'block'
            ShowAllProducts()
                .then((res) => {
                    // handle success
                    console.log(res);
                    setData(res.data.product_list);
                    setIsLoaded(false)


                })
                .catch((error) => {
                    //handle error
                    console.log(error)
                    setIsLoaded(false)
                })
        }

        return () => {

        }
    }, [])

    const bigImg = (e) => {
        e.target.style.height = '291px'
        e.target.style.width = '61%'

    }

    const normalImg = (e) => {
        e.target.style.height = '290px'
        e.target.style.width = '60%'
    }

    const bigLetter = (e1) => {
        e1.target.style.color = 'blue'
        e1.target.style.fontWeight = '900'
    }

    const normalLetter = (e1) => {
        e1.target.style.color = '#000000'
        e1.target.style.fontWeight = 'normal'
    }



    return (
        <React.Fragment>
            
            {isLoaded ? SpinLoad() :
                <>
                    <div className='container-fluid carousel-main'>
                        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6" aria-label="Slide 7"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={Img1} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Black Friday Sale is live. Harry up !</h5>
                                        <p>Shop with ICICI credit card and get 30% off on selected products.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={Img2} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Happy New Year Folks !</h5>
                                        <p>On this new year shop with us and get chance to win Samsung LED TV.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={Img3} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Something Great is comming soon.</h5>
                                        <p>Get in touch with us for surprizing gifts.</p>
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <img src={Img4} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Flat 20% off on selcted brand mobiles</h5>
                                        <p>Shop with Kotak bank debit card to get 20% off.</p>
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <img src={Img5} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Big billion day sale is on the way.</h5>

                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <img src={Img6} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Mega sale for branded laptops.</h5>
                                        <p>Get 15% off with SBI bank credit card on any lenovo laptop.</p>
                                    </div>
                                </div>

                                <div className="carousel-item">
                                    <img src={Img7} className="d-block w-100 img-fluid" style={{ width: '1000px', height: '500px' }} alt="error" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>On this valentine's dat, gift your loved one the best goodie.</h5>

                                    </div>
                                </div>

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>


                    <div className='container-fluid my-2'>

                        <>
                            <div className='container text-center'>
                                <h2>Product List</h2> <br />
                            </div>

                            <div className='container-fliud grid text-center justify-content-center'> {data && data.map((item, index) =>
                                <div key={item.product_id} className="border border-secondary-subtle rounded g-col-xl-3 g-col-lg-4 g-col-md-4 g-col-sm-6 g-col-12" style={{ backgroundColor: 'RGB(224, 224, 222,0.6)' }}>

                                    {index === 1 || index === 3 || index === 6 || index === 10 || index === 13 || index === 15 || index === 17 || index === 24 ?


                                        <React.Fragment>
                                            <Link to={`/productdetails/${item.product_id}`}>  <img src={item.product_image} onMouseOver={(e) => bigImg(e)} onMouseOut={(e) => normalImg(e)} className='product_image' alt="error" style={{ width: '60%', height: '290px' }} /> </Link> <br />
                                            <Link to={`/productdetails/${item.product_id}`}>  <span className="fw normal product_name" onMouseOver={(e) => bigLetter(e)} onMouseOut={(e) => normalLetter(e)} >{item.product_name} </span> <span className="badge rounded-pill text-bg-info">New</span></Link>  <br />
                                            {item.product_details} <br />
                                            <span className='text-success'> <b> <span><img src={rupee} alt="error" /> </span> {item.product_price}</b>  </span>  <br />

                                            <Link to={`/productdetails/${item.product_id}`}> <Button className="lowercase-button commonBtn" variant="info">Shop</Button>{' '}</Link> <br /><br />

                                        </React.Fragment>
                                        : index === 2 || index === 5 || index === 10 ?
                                            <React.Fragment>
                                                <Link to={`/productdetails/${item.product_id}`}>  <img src={item.product_image} onMouseOver={(e) => bigImg(e)} onMouseOut={(e) => normalImg(e)} className='product_image' alt="error" style={{ width: '60%', height: '290px' }} /> </Link> <br />
                                                <Link to={`/productdetails/${item.product_id}`}> <span className="fw normal product_name" onMouseOver={(e) => bigLetter(e)} onMouseOut={(e) => normalLetter(e)} >{item.product_name} <span className="badge rounded-pill text-bg-info">20% Off</span>  </span> </Link> <br />
                                                {item.product_details}  <br />
                                                <span className='text-success'> <b> <span><img src={rupee} alt="error" /> </span> {item.product_price}  </b>  </span>  <br />

                                                <Link to={`/productdetails/${item.product_id}`}> <Button className="lowercase-button" variant="info">Shop</Button>{' '}</Link> <br /><br />
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <Link to={`/productdetails/${item.product_id}`}>  <img src={item.product_image} onMouseOver={(e) => bigImg(e)} onMouseOut={(e) => normalImg(e)} className='product_image' alt="error" style={{ width: '60%', height: '290px' }} /> </Link> <br />
                                                <Link to={`/productdetails/${item.product_id}`} > <span className="fw normal product_name" onMouseOver={(e) => bigLetter(e)} onMouseOut={(e) => normalLetter(e)} >{item.product_name} </span> {fDeliveryProduct.includes(index) && <span className="badge rounded-pill text-bg-info">Free Delivery</span>} </Link> <br />
                                                {item.product_details}  <br />
                                                <span className='text-success'> <b> <span><img src={rupee} alt="error" /> </span> {item.product_price} </b> </span>  <br />

                                                <Link to={`/productdetails/${item.product_id}`}> <Button className="lowercase-button" variant="info">Shop</Button>{' '}</Link> <br /><br />
                                            </React.Fragment>
                                    }

                                </div>
                            )}
                            </div>
                        </>

                    </div>
                    <br />
                </>}
        </React.Fragment>
    )
}





