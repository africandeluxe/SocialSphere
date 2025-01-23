import './globals.css';
import { manrope, spaceGrotesk } from '../styles/fonts';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Meta Tags for Better SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SocialSphere - Simplifying social media management" />
        <meta name="author" content="SocialSphere Team" />
        <link rel="icon" href="/favicon.ico" />
        <title>SocialSphere</title>
      </head>
      <body className="bg-brand-cream text-brand-dark min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}