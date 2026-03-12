import "./globals.css"

export const metadata = {
  title: "RepForge",
  description: "Track your strength and hypertrophy progress",
  manifest: "/manifest.json"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111827" />
      </head>

      <body>
        {children}
      </body>

    </html>
  )
}