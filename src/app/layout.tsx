import './globals.css';
import { manrope, spaceGrotesk } from '../styles/fonts';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="SocialSphere - Simplifying social media management for modern brands and individuals."
        />
        <meta name="keywords" content="SocialSphere, social media, management, analytics, planning" />
        <meta name="author" content="SocialSphere Team" />
        <meta property="og:title" content="SocialSphere - Simplifying Social Media Management" />
        <meta
          property="og:description"
          content="An intuitive platform for managing and analyzing your social media content."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://social-sphere-kohl.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SocialSphere" />
        <meta name="twitter:description" content="Simplifying social media management." />
        <meta name="twitter:image" content="/twitter-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <title>SocialSphere</title>
      </head>
      <body className="bg-brand-cream text-brand-dark min-h-screen antialiased">
        <AuthProvider>
            <main className="flex-grow">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}