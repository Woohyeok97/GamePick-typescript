'use client'

import "./globals.scss";
import { ReactNode } from "react";
import { Noto_Sans_KR } from 'next/font/google'
// components
import Navbar from "@/components/navbar/Navbar";
// provider
import { SessionProvider } from 'next-auth/react'

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
        <SessionProvider>
            <html lang="ko">
                <body className={ notoSansKorean.className }>
                    <Navbar/>
                    <div className="page-container">
                        { children }
                    </div>
                </body>
            </html>
        </SessionProvider>
      )
}