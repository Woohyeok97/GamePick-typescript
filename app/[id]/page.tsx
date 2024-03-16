import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// components
import TrailerImage from "@/components/trailerImage/TrailerImage";
import LikeButton from "@/components/shared/LikeButton";
// remotes
import { getGameById, getUserLike } from "../remotes/mongodb/servie";

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
      <div className="flex flex-col gap-5 justify-betwee lg:flex-row">
        <div className="mr-[5%] md:mr-0 mb-10">
          <TrailerImage game={game} />
        </div>

        <div className="flex flex-col justify-between flex-grow gap-5">
          <div className="bg-bgGray rounded-[15px] p-5 flex-grow">
            <div className="mb-3 text-lg font-bold">
              소개
            </div>
            <div className="text-fontDarkGray">
              {game?.description}
            </div>
          </div>
            <div className="bg-bgGray rounded-[15px] p-5 releasedAt">
              <div className="mb-3 text-lg font-bold">
                출시일
              </div>
              <div className="text-fontDarkGrayt">
                {game?.releasedAt}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
