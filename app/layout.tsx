'use client'

import "./globals.scss";
import { ReactNode } from "react";
import { Noto_Sans_KR } from 'next/font/google'
// components
import Navbar from "@/components/navbar/Navbar";
// provider
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

// font
const notoSansKorean = Noto_Sans_KR({
    weight : ['400'],
    subsets: ['latin'],
})

interface RootLayoutProps {
    children : ReactNode,
}

export default function RootLayout({ children } : RootLayoutProps) {

    const queryClient = new QueryClient() 
    
    return (
        <SessionProvider>
            <QueryClientProvider client={ queryClient }>
                <html lang="ko">
                    <body className={ notoSansKorean.className }>
                        <Navbar/>
                        <div className="page-container">
                            { children }
                        </div>
                    </body>
                </html>
            </QueryClientProvider>
        </SessionProvider>
      )
}