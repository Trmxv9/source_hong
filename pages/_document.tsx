import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="purple-dark text-foreground" lang="pt-BR">
      <Head />
      <title>Hong APP</title>
      <link rel="manifest" href="/manifest.json" />

      <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />

      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

      <link
        rel="android-chrome-192x192"
        href="/icons/android-chrome-192x192.png"
      />
      <link
        rel="android-chrome-512x512"
        href="/icons/android-chrome-512x512.png"
      />
      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
