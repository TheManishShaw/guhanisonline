import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export const metadata = {
  title: "Home | Guhanis Official",
  description: "Artist | Music Producer",
};
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../public/assets/fonts/JMH Typewriter.ttf",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.className} bg-background`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
