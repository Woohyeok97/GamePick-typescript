import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// components
import GameItem from '@/components/shared/GameItem';
import UserProfile from '@/components/shared/UserProfile';
import GuestProfile from '@/components/shared/GuestProfile';
// remotes
import { getGameList } from '../remotes/mongodb/servie';


export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const gameList = await getGameList();
    
  return (
    <div className="page">
      <div className="mb-6">
        {session?.user ? (
          <UserProfile session={session} />
        ) : (
            <GuestProfile />
        )}
      </div>

      <div className="page__header">
        <h1>게임목록</h1>
      </div>

      <ul>
      {gameList?.map((item, _) => (
        <li key={item?._id}>
          <Link href={`/${item?._id}`}>
            <GameItem game={item} />
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
}
