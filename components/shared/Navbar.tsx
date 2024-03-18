import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Navbar() {
  const sesstion = await getServerSession(authOptions);

  return (
    <nav className="sticky h-[60px] border-b-2">
      <div className="flex justify-between items-center w-[90%] h-full mx-auto">
        <Link href="/" className="text-lg font-bold hover:font-black hover:text-fontDarkGray">
          Game Pick
        </Link>
        {sesstion?.user && (
          <Link href="/upload" className="text-lg font-bold hover:font-black hover:text-fontDarkGray">
            업로드
          </Link>
        )}
      </div>
    </nav>
  );
}
