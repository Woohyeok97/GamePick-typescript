import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// component
import LikeButton from './LikeButton';
import Image from 'next/image';
// remotes
import { getUserLike } from '@/app/remotes/mongodb/servie';
// type
import { GameType } from '@/interface';


interface GameItemProps {
  game: GameType;
}

export default async function GameItem({ game }: GameItemProps) {
  const session = await getServerSession(authOptions);
  const userLike = await getUserLike(game?._id, session);

  return (
    <div className="flex flex-col justify-between items-center w-full mb-[60px] md:flex-row">
      <Image src={game?.image} width={300} height={250} alt='n' className="w-full rounded-md md:mr-[5%]"/>
      
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold lg:text-4xl">{game?.title}</h1>
          <LikeButton userLike={userLike} game={game} session={session} />
        </div>
        
        <div className="mb-5 lg:text-xl">{game?.description}</div>
        <div className="mb-5 text-fontGray">{game?.releasedAt} 출시</div>
      </div>
    </div>
  );
}