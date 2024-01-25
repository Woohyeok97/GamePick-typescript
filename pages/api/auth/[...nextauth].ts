import NextAuth, { NextAuthOptions } from 'next-auth'
// providers
import GoogleProvider from 'next-auth/providers/google'
import NaverProvider from 'next-auth/providers/naver'
import KakaoProvider from 'next-auth/providers/kakao'

export const authOptions : NextAuthOptions = {
    // 프로바이더 
    providers : [
        GoogleProvider({
            clientSecret : process?.env?.GOOGLE_CLIENT_SECRET || '',
            clientId : process?.env?.GOOGLE_CLIENT_ID || '',
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID || '',
            clientSecret: process.env.NAVER_CLIENT_SECRET || ''
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || '',
            clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
        }),
    ],

    // page 설정
    pages : {
        signIn : '/login',
    },

    // session 설정
    session : {
        strategy : 'jwt',
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60 * 2,
    },  

    // 콜백설정(사용자 로그인 그리고 주기적으로 실행되어서 세션과 jwt 최신상태유지)
    callbacks : {
        // 로그인에 성공하면 실행됨
        // session은 사용자 정보를 담고있어서 사용자인증이 필요할때 쓰임
        // 여기서는 로그인성공시 만들어진 jwt에 들어있는 정보를 user라는 필드에 추가함
        session : async ({ session, token }) => ({
            ...session,
            user : {
                ...session.user,
                id : token.sub,
            } 
        }),
        // 로그인시 jwt(token)이 만들어지고 token에 소셜플랫폼에서 받은 user.id를 넣음
        jwt : async ({ user, token }) => {
            if(user) {
                token.sub = user.id;
            }
            // user?.id가 들어있는 토큰반환
            return token
        }
    },
}

export default NextAuth(authOptions)