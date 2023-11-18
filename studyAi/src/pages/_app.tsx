import "tailwindcss/tailwind.css";
import * as React from "react";
import AuthProvider from "../app/util/providers/AuthContext";
import { IsClientCtxProvider } from "../app/util/providers/isClientProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { OriginProvider } from "../app/util/providers/originProvider";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OriginProvider>
      <IsClientCtxProvider>
        <AuthProvider>
          <StyledEngineProvider injectFirst>
            <Component {...pageProps} />
          </StyledEngineProvider>
        </AuthProvider>
      </IsClientCtxProvider>
    </OriginProvider>
  );
}
