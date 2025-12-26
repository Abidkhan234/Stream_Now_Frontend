import axiosInstance from "@/config/axios";
import localHelper from "@/helpers/localStorage";

const handleCardList = async ({ queryKey }) => {
    try {

        const page = queryKey[1];

        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token not found");
            return
        }

        const { data } = await axiosInstance.get(`/gateway/card`, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        });

        return data.data
    } catch (error) {
        console.log("Error while fetching Cards", error);
        throw error.response.data.message
    }
}

const handleUpdateCard = async ({ payload, slug }) => {
    try {
        const { api_token } = await localHelper.getItem("userData");

        if (!api_token) {
            console.log("api_token not found");
            return;
        }

        const { data } = await axiosInstance.post(
            `/gateway/card/${slug}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${api_token}`,
                },
            }
        );

        return { message: data.message };
    } catch (error) {
        console.log("Error while updating default card", error);
        throw error.response?.data?.data.message || "Something went wrong";
    }
};

export { handleCardList, handleUpdateCard }