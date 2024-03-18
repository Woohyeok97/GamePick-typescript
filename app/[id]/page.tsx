import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// components
import TrailerImage from "@/components/trailer/TrailerImage";
import LikeButton from "@/components/shared/LikeButton";
// remotes
import { getGameById, getUserLike } from "../../remotes/mongodb/servie";
import Link from "next/link";
import GameDeleteButton from "@/components/shared/GameDeleteButton";

interface GameDetailPageProps {
  params: { id: string };
}

export default async function GamePage({ params }: GameDetailPageProps) {
  const session = await getServerSession(authOptions);
  const game = await getGameById(params?.id);
  const userLike = await getUserLike(game?._id, session);

  return (
    <div className="page">
      <div className="page__header">
        <div className="flex justify-between">
          <h2>{game?.title}</h2>
          <div>
            <LikeButton userLike={userLike} game={game} session={session} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-5 justify-betwee lg:flex-row md:gap-8">
        <TrailerImage game={game} />

        <div className="flex flex-col justify-between flex-grow gap-5">
          <div className="flex-grow p-5 rounded-lg bg-bgGray">
            <div className="mb-3 text-lg font-bold">
              소개
            </div>
            <div className="text-fontDarkGray">
              {game?.description}
            </div>
          </div>
            <div className="p-5 rounded-lg bg-bgGray releasedAt">
              <div className="mb-3 text-lg font-bold">
                출시일
              </div>
              <div className="text-fontDarkGrayt">
                {game?.releasedAt}
              </div>
            </div>
        </div>
      </div>
      {session?.user && (
        <div className="flex justify-end gap-5 p-5">
          <Link href={`/${game._id}/edit`}>
            <div className="textBtn">편집</div>
          </Link>
          <GameDeleteButton gameId={game._id}/>
        </div>
      )}
    </div>
  );
}
