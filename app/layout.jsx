import './globals.css'
import { SupabaseProvider } from '@/lib/supabase'

export const metadata = {
  title: 'fortsaga',
  description: 'Created with v0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
