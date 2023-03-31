import { SessionProvider } from 'next-auth/react'
import { Global, css } from '@emotion/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Global styles={css`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          color: rgb(17 24 39);
          background-color: #f3f4f6;
        }
     
        a {
          color: rgb(0 0 0);
          text-decoration: none;
          
        }

      `} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}