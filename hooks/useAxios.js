import axiosInstance from "@/config/axios";
import generateStripeToken from "@/helpers/generateStripeToken";
import localHelper from "@/helpers/localStorage";

const useGet = async ({ api_url, api_name, isAdmin }) => {
  try {
    const userData = isAdmin ? (await localHelper.getItem("adminData")) || {} : (await localHelper.getItem("userData")) || {};

    const headers = {};

    if (userData?.api_token) {
      headers.Authorization = `Bearer ${userData.api_token}`;
    }

    const { data } = await axiosInstance.get(api_url, {
      headers,
    });

    return { data: data?.data, meta: data?.pagination?.meta };
  } catch (error) {
    console.log(`Error while ${api_name}`, error);
    throw {
      message:
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        `${api_name} failed`,
      statusCode: error?.response?.data.code || 500,
    };
  }
};

const usePost = async ({
  api_url,
  api_name,
  payload,
  isFormData,
  slug,
  isCreditCard,
  isAdmin
}) => {
  try {
    let body = isCreditCard ? { payload } : payload;

    if (isCreditCard) {
      const { error, stripeData } = await generateStripeToken(
        body.payload.values
      );

      if (error) {
        throw {
          message:
            error?.response?.data?.data?.message ||
            error?.response?.data?.data ||
            error?.response?.data?.message ||
            error?.message ||
            `${api_name} failed`,
          statusCode:
            error?.response?.data?.data?.code ||
            error?.response?.data?.code ||
            error?.statusCode ||
            500,
        };
      }

      body.stripeData = stripeData;
    }

    const headers = {};

    const userData = isAdmin ? (await localHelper.getItem("adminData")) || {} : (await localHelper.getItem("userData")) || {};

    // Add token if available
    if (userData?.api_token) {
      headers.Authorization = `Bearer ${userData.api_token}`;
    }

    // Handle FormData
    if (isFormData) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
        } else {
          formData.append(key, value);
        }
      });
      body = formData;
      headers["Content-Type"] = "multipart/form-data";
    }

    if (slug) {
      api_url += `/${slug}`;
    }

    const { data } = await axiosInstance.post(
      api_url,
      isCreditCard
        ? {
          plan_id: body.payload.plan_id,
          card_token: body.stripeData.id,
          name: body.payload.plan_name,
        }
        : body,
      { headers }
    );

    return {
      data: data?.data || data,
      message: data?.message || `${api_name} successful`,
    };
  } catch (error) {
    console.log(`Error while ${api_name}:`, error);

    throw {
      message:
        error?.response?.data?.data?.message ||
        error?.response?.data?.data ||
        error?.response?.data?.message ||
        error?.message ||
        `${api_name} failed`,
      statusCode:
        error?.response?.data?.data?.code ||
        error?.response?.data?.code ||
        error?.statusCode ||
        500,
    };
  }
};

const useDelete = async ({ api_url, api_name, payload, slug, isAdmin }) => {
  try {
    const userData = isAdmin ? (await localHelper.getItem("adminData")) || {} : (await localHelper.getItem("userData")) || {};

    const headers = {};

    // Add token if available
    if (userData?.api_token) {
      headers.Authorization = `Bearer ${userData.api_token}`;
    }

    if (slug) {
      api_url += `/${slug}`;
    }

    const { data } = await axiosInstance.delete(api_url, { headers });

    return {
      data: data?.data || data,
      message: data?.message || `${api_name} successful`,
    };
  } catch (error) {
    console.log(`Error while ${api_name}:`, error);

    throw {
      message:
        error?.response?.data?.data ||
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        `${api_name} failed`,
      statusCode:
        error?.response?.data?.data?.code ||
        error?.response?.data?.code ||
        error?.statusCode ||
        500,
    };
  }
};

const useUpdate = async ({ }) => { };

export { useGet, usePost, useDelete, useUpdate };
