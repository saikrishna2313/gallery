import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gallery",
  description: "AI Image Editor",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
       
        <section>
        {children}
        </section>
        
       
      </body>
    </html>
      </ClerkProvider>
    
  );
}
