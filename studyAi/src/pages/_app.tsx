import "../globals.css";
import * as React from "react";
import { IsClientCtxProvider } from "../app/util/providers/isClientProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { OriginProvider } from "../app/util/providers/originProvider";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <OriginProvider>
      <IsClientCtxProvider>
        <SessionProvider session={session}>
          <StyledEngineProvider injectFirst>
            <Component {...pageProps} />
          </StyledEngineProvider>
        </SessionProvider>
      </IsClientCtxProvider>
    </OriginProvider>
  );
}
