import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { n1:[], isLoaded: true };
    }

    componentDidMount() {
        axios.post('https://akashsir.in/myapi/ecom1/api/api-view-product.php')
            .then((res) => {
                // handle success
                // console.log(res.data);
                this.setState({ n1: res.data,isLoaded:false });
                // alert('Data fetched')
                

            })
            .catch((res) => {
                //handle error
                console.log(res)
            })
    }



    render() {
        // destructuring assignment
        var {n1,  isLoaded } = this.state;

        console.log(n1)
        return (
            <React.Fragment>
                <br/>

                {isLoaded ? <h1>Loading...</h1> :  
                <>
                <h2>Product List</h2>
                
                <ul> {n1.product_list.map((item) =>
                    <li key={item.product_id}>
                       
                          <b>{item.product_name} </b> <br />
                        Details : {item.product_details} <br />
                         Price : <b>{item.product_price} Rs. </b>  <br />

                        <Link to={`/productdetails/${item.product_id}`}>  <img src={item.product_image} alt="error" style={{ width: '200px' }} /> </Link><br />

                        <Link to={`/productdetails/${item.product_id}`}> <button>Details</button></Link> <br /><br />

                    </li>
                )}
                </ul>
                </>
    }
            </React.Fragment>
        );
    }
}

export default ProductList;