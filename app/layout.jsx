"use client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
          <StoreProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster richColors position="top-center" />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </StoreProvider>
        </SessionsProvider>
      </body>
      <Script
        type="text/javascript"
        src="https://www.paypal.com/sdk/js?client-id=AYI2ckD-VUorFA7pi-meCy2Yq1pfuJSOpvtbAYz5GUTh6c2eGNCGAvTooxlSANAMovCrkPYF2w4xkrkN"
      ></Script>
    </html>
  );
}
