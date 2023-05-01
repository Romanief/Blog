import LoginContext from "../../context/LoginContext"
import type { AppProps } from "next/app"

import "@/styles/globals.css"
import DataContext from "../../context/DataContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginContext>
      <DataContext>
        <Component {...pageProps} />
      </DataContext>
    </LoginContext>
  )
}
