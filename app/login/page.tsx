'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";


export default function LoginPage() {
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.replace('/')
        }
    }, [session?.status])


    return (
        <div className="page">
            <div className="login-page">
                <div className="page__header">
                    <h2>로그인</h2>
                    <p>SNS 계정으로 로그인하실 수 있습니다.</p>
                </div>

                <div className="login-page__btn-box">
                    <button className="login-btn google" onClick={() => signIn('google')} type="button">
                        Google 로그인
                    </button>
                    <button className="login-btn naver" onClick={() => signIn('naver')} type="button">
                        Naver 로그인
                    </button>
                    <button className="login-btn kakao" onClick={() => signIn('kakao')} type="button">
                        Kakao 로그인
                    </button>
                </div>
            </div>
        </div>
    )
}