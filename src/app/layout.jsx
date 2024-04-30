import '/styles/globals.css'
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers> {/* Chakra provider */}
        </body>
    </html>
  )
}
