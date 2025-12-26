// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import localHelper from "@/helpers/localStorage";

// const ProtectedPagesWrapper = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const authChecking = async () => {
//       try {
//         const userData = await localHelper.getItem("userData");
//         const selectedPlan = await localHelper.getItem("subscribeCard");

//         if (!userData) {
//           router.replace("/");
//           return;
//         }

//         if (!userData.is_subscribed) {
//           if (!selectedPlan) {
//             router.replace("/choose-plan");
//             return;
//           }

//           router.replace("/credit");
//           return;
//         }

//         // Prevent unnecessary redirect loops if already on /home
//         if (pathname === "/") {
//           router.replace("/home");
//           return;
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         router.replace("/");
//       }
//     };

//     authChecking();
//   }, [router, pathname]);

//   return <>{children}</>;
// };

// export default ProtectedPagesWrapper;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProtectedPagesWrapper = async ({ children }) => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("userData");

  if (!userData?.value) {
    redirect("/");
  }

  const parsed = JSON.parse(userData?.value);

  if (!parsed.subscription_id) {
    redirect("/choose-plan");
  }

  return <>{children}</>;
};

export default ProtectedPagesWrapper;
