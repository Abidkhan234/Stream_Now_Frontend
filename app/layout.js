import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/wrappers/queryProvider";
import { Toaster } from "react-hot-toast";
import { UIContextProvider } from "@/contexts/UIContext";
import { AdminContextProvider } from "@/contexts/adminContext";

const myFont = localFont({
  src: [
    {
      path: "../public/font/LufgaLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/LufgaRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/LufgaMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/LufgaSemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/LufgaBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/LufgaExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/LufgaBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "inevia",
  icons: {
    icon: "/Favicon/logo-1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${myFont.className} !bg-[#0C0C0C] min-h-[100vh] text-white`}
      >
        <>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                duration: 1200,
              },
              error: {
                duration: 1500,
              },
            }}
          />
        </>
        <QueryProvider>
          <AdminContextProvider>
            <UIContextProvider>
              {children}
            </UIContextProvider>
          </AdminContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
