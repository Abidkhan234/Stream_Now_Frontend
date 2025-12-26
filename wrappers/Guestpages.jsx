// "use client";

// import { useEffect } from "react";
// import {useRouter } from "next/navigation";
// import localHelper from "@/helpers/localStorage";

// const GuestPages = ({ children }) => {
//   const router = useRouter();

//   useEffect(() => {
//     const authChecking = async () => {
//       const userData = await localHelper.getItem("userData");

//       if (userData && userData.subscription_id) {
//         router.replace("/home");
//         return;
//       }
//     };

//     authChecking();
//   }, []);

//   return <>{children}</>;
// };

// export default GuestPages;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const GuestPages = async ({ children }) => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("userData");

  if (!userData?.value) return <>{children}</>;

  const parsed = JSON.parse(userData?.value);

  if (parsed.subscription_id) redirect("/home");

  return children;
};

export default GuestPages;
