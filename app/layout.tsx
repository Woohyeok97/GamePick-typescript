import '@/styles/globals.css';
import { ReactNode } from "react";
import { Noto_Sans_KR } from 'next/font/google'
// components
import Navbar from "@/components/shared/Navbar";
import Overlay from "./Overlay";
import RootProvider from './RootProvider';

// font
const notoSansKorean = Noto_Sans_KR({
  weight: ['400'],
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <RootProvider>
      <html lang="ko">
        <body className={notoSansKorean.className}>
          <Navbar />
          <div className="max-w-[1140px] w-[90%] mx-auto">
            {children}
          </div>
          <Overlay />
        </body>
      </html>
    </RootProvider>    
  );
}