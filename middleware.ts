export { default } from "next-auth/middleware"

// 미들웨어로 인증이 필요한 url설정하기(env에 NEXTAUTH_SECRET필요)
export const config = {
  matcher: ["/upload", "/:id/edit"],
};