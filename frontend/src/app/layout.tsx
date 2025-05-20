import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import "../icons/fontawesome";
import { ReduxProvider } from "@/redux/provider";
import AuthProvider from "./AuthProvider";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import "bootstrap/dist/css/bootstrap.min.css";

const geistSans = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <main className="containerPage">
          <ReduxProvider>
            <AuthProvider>
              <Header />
              <div className="container">{children}</div>
              <Footer />
            </AuthProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
