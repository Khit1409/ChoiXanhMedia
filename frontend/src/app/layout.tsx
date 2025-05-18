import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../icons/fontawesome";
import { ReduxProvider } from "@/redux/provider";
import AuthProvider from "./AuthProvider";
import Header from "@/components/sections/header";
import NavbarBottom from "@/components/sections/navbarb-bottom";
import Footer from "@/components/sections/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Công ty Chồi Xanh Media - Chuyên cung cấp máy tính và thiết bị công nghệ",
  description:
    "Công ty Chồi Xanh Media Chuyên cung cấp máy tính và thiết bị công nghệ",
  keywords: [
    "mua bán máy tính",
    "mua bán điện thoại",
    "mua máy lạnh",
    "máy tính bảng",
    "mua máy tính bảng",
    "thiết kế web",
    "thiết kế web uy tín",
    "chồi xanh media",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=block"
        />
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Header />
          
            {children}
            <NavbarBottom />
            <Footer />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
