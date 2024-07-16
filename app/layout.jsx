"use client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// export const metadata = {
//   title: "Home | Guhanis Official",
//   description: "Artist | Music Producer",
// };
import localFont from "next/font/local";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StoreProvider from "./StoreProvider";
import Script from "next/script";
import SessionsProvider from "./SessionsProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../public/assets/fonts/advanced_pixel-7.ttf",
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  const initialOptions = {
    "client-id":
      "AUwUuAb8MDIzKa371fKxI7BcYS8q8bEcv3wTiaacxHvbh0s8sgtF3LJUIUIQOn_fPzU7beg84UGNuTJ0",
  };
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${myFont.className} bg-background`}
      >
        <SessionsProvider>
          <PayPalScriptProvider options={initialOptions}>
            <StoreProvider>
              <QueryClientProvider client={queryClient}>
                {children}
                <Toaster richColors position="top-center" />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </StoreProvider>
          </PayPalScriptProvider>
        </SessionsProvider>
      </body>
    </html>
  );
}
