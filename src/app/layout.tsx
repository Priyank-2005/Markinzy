import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Markinzy – AI Marketing Platform',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  description: 'Streamline your marketing with powerful AI tools. Generate content, fix SEO, analyze keywords and more — all in one platform.',
  keywords: ['AI marketing', 'SEO tools', 'content generator', 'Markinzy'],
  openGraph: {
    title: 'Markinzy – AI Marketing Platform',
    description: 'All-in-one AI platform to automate your marketing workflow.',
    url: 'https://markinzy.vercel.app',
    siteName: 'Markinzy',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Markinzy preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markinzy',
    description: 'All-in-one AI platform to automate your marketing workflow.',
    images: ['/og-image.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
