import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "./util/providers/AuthContext";
import GraphQLProvider from "./util/providers/apolloProvider";
import { IsClientCtxProvider } from "./util/providers/isClientProvider";

export const metadata: Metadata = {
  title: "StudyAI",
  description:
    "Generate an endless amount of practice questions, using the power of AI",
  icons: [
    {
      url: "/logo/favicon.ico",
      type: "image/x-icon",
    },
    {
      url: "/logo/favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      type: "image/png",
      sizes: "32x32",
      url: "/logo/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/logo/apple-touch-icon.png",
    },
  ],
  manifest: "/site.webmanifest",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GraphQLProvider>
        <IsClientCtxProvider>
          <AuthProvider>
            <body>{children}</body>
          </AuthProvider>
        </IsClientCtxProvider>
      </GraphQLProvider>
    </html>
  );
}
