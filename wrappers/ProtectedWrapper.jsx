"use client";

import localHelper from "@/helpers/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedWrapper = ({ children, lookingFor, prevRoute }) => {
  const router = useRouter();

  const handleChecking = async () => {
    const localThing = await localHelper.getItem(`${lookingFor}`) || null;

    if (!localThing) {
      return router.replace(`/${prevRoute}`);
    }
  };

  useEffect(() => {
    handleChecking();
  }, []);

  return children;
};

export default ProtectedWrapper;
