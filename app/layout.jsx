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

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${myFont.className} bg-background`}
      >
        <SessionsProvider>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AZ9AqzmQVaHFPLZawgsSK7d9bZOeyIEe8ZLMdCre1U-S78bWFCM2VoMi4D8Dg57eg2H4tzdn8HdxWBuK",
              "enable-funding": "venmo",
            }}
          >
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
