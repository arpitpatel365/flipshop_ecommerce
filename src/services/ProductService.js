import axios from "axios"

const { REACT_APP_API_ENDPOINT } = process.env;
// console.log(process.env.REACT_APP_API_ENDPOINT)
// console.log(REACT_APP_API_ENDPOINT);

export const ShowAllProducts = async () => {
    try {
        let res = await axios.get(`${REACT_APP_API_ENDPOINT}/api-view-product.php`)
        return res
    }
    catch (error) {
        throw error
    }
}

export const GetProductdetails = async (id) => {
    try {
        let res = await axios.post(`${REACT_APP_API_ENDPOINT}/api-view-product.php?product_id=${id}`)
        return res;
    }

    catch (error) {
        throw error
    }
}

export const AddProductCart = async (data) => {

    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}/api-cart-insert.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })
        return res;
    } catch (error) {
        throw error
    }
}

export const getCartList = async (data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-cart-list.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res;

    } catch (error) {
        throw error
    }
}

export const ConfirmOrder = async (data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-add-order.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res;
    } catch (error) {
        throw error
    }
}

export const DeleteProduct = async (data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-cart-remove-product.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res;
    } catch (error) {
        throw error;
    }
}

export const getOrderList = async (data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}/api-order-list.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const cancelOrder = async(data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-order-remove.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res;
    } catch (error) {
        throw error;
    }
    
}