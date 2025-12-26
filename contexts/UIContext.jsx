"use client";

import localHelper from "@/helpers/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState({});
  const [activeCreditCard, setActiveCreditCard] = useState(null);
  const [isCanceled, setIsCanceled] = useState(null);

  const checkingUserLogin = async () => {
    const userData = await localHelper.getItem("userData");

    console.log("Userdata", userData);

    if (!userData) {
      return;
    }

    setUserData(userData);
  };

  const handlePlanDetails = async () => {
    const planData = await localHelper.getItem("subscribeCard");
    if (!planData) {
      setSelectedSubscription({});
      return;
    }
    setSelectedSubscription(planData);
  };

  useEffect(() => {
    checkingUserLogin();
  }, []);

  useEffect(() => {
    handlePlanDetails();
  }, []);

  return (
    <UIContext.Provider
      value={{
        userData,
        setUserData,
        adminData,
        setAdminData,
        selectedSubscription,
        setSelectedSubscription,
        activeCreditCard,
        setActiveCreditCard,
        isCanceled,
        setIsCanceled,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

const useUIContext = () => useContext(UIContext);

export default useUIContext;
