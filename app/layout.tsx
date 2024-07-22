import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "components/material-tailwind-theme-provider";
import ReactQueryClientProvider from "config/ReactQueryClientProvider";
import Header from "components/header";
import Footer from "components/footer";
import RecoilProvider from "config/RecoilProvider";
import MainLayout from "components/layouts/main-layout";
import Auth from "components/auth";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "config/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  return (
    <RecoilProvider>
      <ReactQueryClientProvider>
        <ThemeProvider>
          <html lang="en">
            <head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </head>
            <AuthProvider accessToken={session?.access_token}>
              <body className={inter.className}>
                {session?.user ? <MainLayout>{children}</MainLayout> : <Auth />}
              </body>
            </AuthProvider>
          </html>
        </ThemeProvider>
      </ReactQueryClientProvider>
    </RecoilProvider>
  );
}
