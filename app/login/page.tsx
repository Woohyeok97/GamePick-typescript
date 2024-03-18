'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.replace('/');
    }
  }, [session?.status]);

  return (
    <div className="page">
      <div className="w-[80%] mx-auto md:w-[60%]">
        <div className="page__header">
          <h2>로그인</h2>
          <p className="mt-3 text-sm">SNS 계정으로 로그인하실 수 있습니다.</p>
        </div>

        <div className="flex flex-col justify-between">
          <button
            className="btn text-black mb-6 py-5 px-10 w-full bg-[#f7f7f7] hover:text-gray-700"
            onClick={() => signIn('google')}
            type="button"
          >
              Google 로그인
          </button>
          <button
            className="btn text-black mb-6 py-5 px-10 w-full bg-[#23ae00] hover:text-gray-700"
            onClick={() => signIn('naver')}
            type="button"
          >
              Naver 로그인
          </button>
          <button
            className="btn text-black mb-6 py-5 px-10 w-full bg-[#f7e309] hover:text-gray-700"
            onClick={() => signIn('kakao')}
            type="button"
          >
              Kakao 로그인
          </button>
        </div>
      </div>
    </div>
  );
}