'use client'
import { Session } from 'next-auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// type
import { GameType, LikeType } from '@/interface';
// remotes
import { createLike, deleteLikeById } from '@/remotes/axois/likeAPI';

interface LikeButtonProps {
  game: GameType;
  userLike: LikeType;
  session: Session | null;
}

export default function LikeButton({ game, userLike, session }: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { data: currentLikeId } = useQuery({
    queryKey: [`like`, `${game?._id}`], 
    enabled: !!session?.user,
    initialData: () => {
      queryClient.setQueryData([`like`, `${game?._id}`], userLike?._id);
      return queryClient.getQueryData([`like`, `${game?._id}`]);
    },
  });
    
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!currentLikeId) {
        return await createLike(game?._id);
      } else {
        await deleteLikeById(currentLikeId as string);
        return null; // undifined값으로는 캐시데이터를 없데이트할 수 없기때문에 null 반환
      }
    },
    onMutate: async () => {
      // 만약 다른 컴포넌트에서도 옵티미스틱 업데이트가 필요하다면, 여기서 캐시데이터를 임시값으로 업데이트
      // 현재 캐시데이터 반환(요청 실패시, 롤백 대비용)
      const previousUserLike = queryClient.getQueryData([`like`, `${game?._id}`]);
      return { previousUserLike };
    }, 
    onSuccess: data => {
      // 현재 요청 결과를 캐시데이터에 저장
      queryClient.setQueryData([`like`, `${game?._id}`], data);
    },
    onError: (err, _, context) => {
      // 요청실패시, 이전 데이터로 롤백
      alert(`${err} : 요청에 실패했습니다. 다시한번 시도해주세요.`);
      queryClient.setQueryData([`like`, `${game?._id}`], context?.previousUserLike);
    },
  });

  // 옵티미스틱 업데이트 & 요청 핸들러
  const handleClick = () => {
    if (!isPending) {
      mutate();
    }
  };
    

  // 분기 ) 로그인 정보가 없을때
  if (!session?.user) return (
    <div className="z-50 m-2 text-2xl cursor-pointer">
      <div className="likeInactive" onClick={() => alert('로그인 이후 이용해주세요.')}>
        관심
      </div>
    </div>
  );
  
  // 분기 ) 좋아요 정보가 없을때
  if (!currentLikeId) return (
    <div className="z-50 m-2 text-2xl cursor-pointer">
      <div className={isPending ? 'likeActive' : 'likeInactive'}onClick={handleClick}>
        관심
      </div>
    </div>
  );

  // 분기) 좋아요 정보 있을때
  if (currentLikeId) return (
    <div className="z-50 m-2 text-2xl cursor-pointer">
      <div className={isPending ? 'likeInactive' : 'likeActive'} onClick={handleClick}>
        관심
      </div>
    </div>
  );
}