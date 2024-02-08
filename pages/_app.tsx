import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import "@/i18n";
import { appWithTranslation, useTranslation } from "next-i18next";
import ScrollToTopButton from "@/components/ToTop";

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const preferredLanguage = localStorage.getItem("preferredLanguage");
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, [i18n]);

  return (
    <NextUIProvider>
      <Component {...pageProps} />
      <ScrollToTopButton {...pageProps} />
    </NextUIProvider>
  );
}

export default appWithTranslation(App);
