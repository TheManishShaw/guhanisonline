import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export const metadata = {
  title: "Home | Guhanis Official",
  description: "Artist | Music Producer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
