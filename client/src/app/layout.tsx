import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import "../components/icons/fontawesome";
import { ReduxProvider } from "@/redux/provider";
import AuthProvider from "../redux/AuthProvider";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PathNameComponent from "@/components/sections/header/PathNameComponent";
import AppRender from "./AppRender";

const geistSans = Nunito({
  variable: "--font-geist-sans",
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
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <main className="containerPage">
          <ReduxProvider>
            <Header />
            <PathNameComponent />
            <div className="container-fluid">
              <AuthProvider>
                <AppRender>{children}</AppRender>
              </AuthProvider>
            </div>
            <Footer />
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
