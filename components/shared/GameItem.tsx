import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// component
import LikeButton from './LikeButton';
import Image from 'next/image';
// remotes
import { getUserLike } from '@/remotes/mongodb/servie';
// type
import { GameType } from '@/interface';


interface GameItemProps {
  game: GameType;
}

export default async function GameItem({ game }: GameItemProps) {
  const session = await getServerSession(authOptions);
  const userLike = await getUserLike(game?._id, session);

  return (
    <div className="flex flex-col justify-between items-center w-full mb-[80px] md:flex-row md:items-start md:gap-12 md:mb-[120px]">
      <div className="relative w-full h-[240px] md:w-[240px] mb-4 md:h-[320px] md:basis-[40%]">
        <Image src={game?.image} fill alt='n' className="gameImage" priority sizes="100%"/>
      </div>
      <div className="flex flex-col md:basis-[60%]">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold lg:text-4xl">{game?.title}</h1>
          <LikeButton userLike={userLike} game={game} session={session} />
        </div>
        <div className="mb-5 lg:text-xl md:max-w-full">{game?.description}</div>
        <div className="mb-5 text-fontGray">{game?.releasedAt} 출시</div>
      </div>
    </div>
  );
}