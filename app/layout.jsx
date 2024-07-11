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
      "AbbW1BEdGZLRhdg30NOnHUAYP6CF3yOkyCAsPi0WA5sGU2dI_jvZ52dH4LLmBlGZvV-RtutLsQ-oMecv",
    "enable-funding": "venmo",
    "disable-funding": "",
    country: "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${myFont.className} bg-background`}
      >
        <SessionsProvider>
          <PayPalScriptProvider deferLoading={true} options={initialOptions}>
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
