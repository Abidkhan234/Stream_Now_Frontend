import axiosInstance from "@/config/axios";
import generateStripeToken from "@/helpers/generateStripeToken";
import localHelper from "@/helpers/localStorage";

const handleSubscriptionCards = async () => {
    try {

        const { data } = await axiosInstance.get("/stripe-product");

        return data.data
    } catch (error) {
        console.log(error);
        throw error.response.data
    }
}

const handleMembership = async (payload) => {
    try {
        const { error, stripeData } = await generateStripeToken(payload.values);

        if (error) {
            throw new Error(error.message?.message || error.message || "Card creation failed");
        }

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            throw new Error("Missing API token");
        }

        const { data } = await axiosInstance.post(
            "/payout/subscribe",
            { plan_id: payload.plan_id, card_token: stripeData.id, name: payload.plan_name },
            { headers: { Authorization: `Bearer ${api_token}` } }
        );

        return { userData: data.data, message: data.message };
    } catch (error) {

        console.log("Error while handling membership", error);

        throw {
            message: error?.response?.data?.data?.message || error?.response?.data?.message || "Subscription failed", statusCode: error?.response?.data.code || 500
        };
    }
};

const handleSubscriptionCancel = async (subscriptionId) => {
    try {


        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token is not found");
            return
        }

        const { data } = await axiosInstance.post("/payout/subscribe/cancell", { subscription_id: subscriptionId },
            {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }
        );

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while unsubscribing", error);
        throw { message: error.response.data.data.message || error?.response?.data?.message || "Subscription canceled failed", statusCode: error?.response?.data?.data.code }
    }
}

const handleActiveSubscription = async () => {
    try {

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token is not found");
            return
        }

        const { data } = await axiosInstance.get("/inn-app-purchase/user-subscription?type=subscription",
            {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }
        );

        return data.data
    } catch (error) {
        console.log("Error while getting active subscription", error);
        throw {
            message: error?.response?.data?.data?.message || error?.response?.data?.message, statusCode: error?.response?.data.code || "500"
        }
    }
}

const handlePlanChange = async (selectedSubscription) => {
    try {

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token is not found");
            return
        }

        const { data } = await axiosInstance.post("/payout/subscribe/upgrade", { plan_id: selectedSubscription.plan_id, product_id: selectedSubscription.product_id, name: selectedSubscription.plan_name }, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        });

        return { userData: data.data, message: data.message }
    } catch (error) {
        console.log("Error while changing the plan", error);
        throw error.response.data.data
    }
}

export { handleSubscriptionCards, handleMembership, handleSubscriptionCancel, handleActiveSubscription, handlePlanChange }