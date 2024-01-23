import "./globals.css";
import { ReactNode } from "react";
import { Noto_Sans_KR } from 'next/font/google'

// font
const notoSansKorean = Noto_Sans_KR({
    weight : ['400'],
    subsets: ['latin'],
})

interface RootLayoutProps {
    children : ReactNode,
}

export default function RootLayout({ children } : RootLayoutProps) {
    
    return (
        <html lang="ko">
            <body className={ notoSansKorean.className }>
                { children }
            </body>
        </html>
      )
}