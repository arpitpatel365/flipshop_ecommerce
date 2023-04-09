import axios from "axios";

const { REACT_APP_API_ENDPOINT } = process.env;

export const GetUserProfile = async (formData) => {
    try {
        let res = await axios.post(`${REACT_APP_API_ENDPOINT}api-user-profile-list.php`, formData)
        return res;
    }

    catch (error) {
        throw error;
    }
}

export const PasswordChange = async (data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-change-password.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res
    } catch (error) {
        throw error;
    }
}

export const UpdateProfileData = async (data) => {
    try {
        let res = await axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-user-update.php`,
            data: data,
            headers: { 'Content-Type': "multipart/form-data" }

        })
        return res;
    } catch (error) {
        throw error;
    }
}

export const GetForgotPassword = async (data) => {
    try {
        let res = axios({
            method: "post",
            url: `${REACT_APP_API_ENDPOINT}api-forgot-password.php`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res;
    } catch (error) {
        throw error;
    }
}

export const DoLogin = async (formData) => {

    try {
        let res = axios.post(`${REACT_APP_API_ENDPOINT}api-login.php`, formData)
        return res;
    } catch (error) {
        throw error;
    }
}

export const DoSignUP = async (formData) => {
    
    try {
        let res = axios.post(`${REACT_APP_API_ENDPOINT}api-signup.php`, formData)
        return res;
    } catch (error) {
        throw error;
    }
}