import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Navbar() {
  const sesstion = await getServerSession(authOptions);

  return (
    <nav className="sticky h-[60px] border-b-2">
      <div className="flex justify-between items-center w-[90%] h-full mx-auto text-lg font-black">
        <Link href="/">Game Pick</Link>
        {sesstion?.user && <Link href="/upload">업로드</Link>}
      </div>
    </nav>
  );
}
