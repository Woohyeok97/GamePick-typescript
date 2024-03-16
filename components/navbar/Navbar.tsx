'use client'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="sticky h-[60px] border-b-2">
      <div className="flex justify-between items-center w-[90%] h-full mx-auto">
        <Link href="/">로고</Link>
        
        {session?.data ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <Link href="/login">
            <button>로그인</button> 
          </Link>
        )}
      </div>
    </nav>
  );
}
