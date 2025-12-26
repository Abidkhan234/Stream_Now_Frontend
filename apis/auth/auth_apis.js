import axiosInstance from "@/config/axios";
import localHelper from "@/helpers/localStorage";

const handleRegister = async (values) => {
    try {

        const { data } = await axiosInstance.post("/user", values);

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while registering", error);
        throw error.response.data.data
    }
}

const handleLogin = async (values) => {
    try {

        const { data } = await axiosInstance.post("/user/login", values);

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while Logging", error);
        throw error.response.data.data
    }
}

const handleLogout = async () => {
    try {

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token not found", api_token);
            return
        }

        const { data } = await axiosInstance.post("/user/logout", {}, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        });

        return { message: data.message }
    } catch (error) {
        console.log("Error while logging out", error);
        throw error.response.data.message
    }
}

const handleNewPass = async (values) => {
    try {

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token not found", api_token);
            return
        }

        const { data } = await axiosInstance.post("/user/change-password", { ...values }, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        });

        return { message: data.message }
    } catch (error) {
        console.log("Error while logging out", error);
        throw error.response.data.data
    }
}

const handleUpdateProfile = async (values) => {
    try {

        const { slug, api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token not found", api_token);
            return;
        }

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const { data } = await axiosInstance.post(`/user/${slug}`, formData, {
            headers: {
                Authorization: `Bearer ${api_token}`,
                "Content-Type": "multipart/form-data",
            }
        });

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while updating the profile", error);
        throw error.response.data.data
    }
}

const handleForgetPassword = async (email) => {
    try {

        const { data } = await axiosInstance.post(`/user/forgot-password`, { email });

        return { userData: data.data, message: "OTP send successfully" }
    } catch (error) {
        console.log("Error while email verification", error);
        throw error.response.data.data.email
    }
}

const handleOtp = async (values) => {
    try {

        const { data } = await axiosInstance.post(`/user/verify-code`, { ...values });

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while otp verification", error);
        throw error.response.data.data
    }
}

const handleNewPassword = async (values) => {
    try {

        const { data } = await axiosInstance.post(`/user/update-password`, { ...values });

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while changing password", error);
        throw error.response.data.data
    }
}

const handleDeleteAccount = async () => {
    try {

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token not found", api_token);
            return
        }



        const { data } = await axiosInstance.delete("/user/account/delete", {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        });

        return { message: data.message }
    } catch (error) {
        console.log("Error while deleting account", error);
        throw error.response.data.data.message
    }
}

export { handleRegister, handleLogin, handleLogout, handleNewPass, handleUpdateProfile, handleForgetPassword, handleOtp, handleNewPassword, handleDeleteAccount }