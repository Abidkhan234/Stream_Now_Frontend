import axiosInstance from "@/config/axios";
import localHelper from "@/helpers/localStorage";

const generateStripeToken = async (payload) => {
    try {
        const userData = await localHelper.getItem("userData") || {};

        if (!userData?.api_token) {
            throw {
                message: "Not logged in",
                statusCode: 401
            }
        }

        const { data } = await axiosInstance.post("/payout/card/token", payload, {
            headers: { Authorization: `Bearer ${userData?.api_token}` },
        });

        return { stripeData: data.data };
    } catch (error) {
        console.log("Error while generating token:", error);

        return {
            error,
        }
    };
}

export default generateStripeToken