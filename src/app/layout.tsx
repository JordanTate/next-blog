import type { Metadata } from 'next';
import { Quicksand, DM_Sans } from 'next/font/google';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Providers from './providers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Another Blog for the Road? | Jordan Tate',
  description:
    "Another web developer blog? That's right! But this one has all my ramblings.",
};

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={clsx(quicksand.variable, dmSans.variable)}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
