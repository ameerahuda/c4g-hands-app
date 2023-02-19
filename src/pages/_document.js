import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <title>{"HandS Dashboard"}</title>

      <meta name="description" content="Housing and Savings Dashboard"></meta>
      <meta name="application-name" content="HandS Dashboard" />
      <meta name="theme-color" content="#000000" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/icon192.png"></link>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
