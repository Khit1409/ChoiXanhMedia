import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import "../components/icons/fontawesome";
import { ReduxProvider } from "@/redux/provider";
import AuthProvider from "../redux/AuthProvider";
import AppRender from "./AppRender";

const geistSans = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "",
  description:
    "",
  keywords: [
    ""
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=block"
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <main>
          <ReduxProvider>
            <AuthProvider>
              <AppRender>{children}</AppRender>
            </AuthProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
