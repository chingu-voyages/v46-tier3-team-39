import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "./util/providers/AuthContext";
import GraphQLProvider from "./util/providers/apolloProvider";
import { IsClientCtxProvider } from "./util/providers/isClientProvider";
import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { OriginProvider } from "./util/providers/originProvider";

// export default function GlobalCssPriority() {
//   return (
//       {/* Your component tree. Now you can override Material UI's styles. */}
//     </StyledEngineProvider>
//   );
// }
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
        <OriginProvider>
          <IsClientCtxProvider>
            <AuthProvider>
              <StyledEngineProvider injectFirst>
                <body>{children}</body>
              </StyledEngineProvider>
            </AuthProvider>
          </IsClientCtxProvider>
        </OriginProvider>
      </GraphQLProvider>
    </html>
  );
}
