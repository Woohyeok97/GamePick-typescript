'use client'
import { useRouter } from 'next/navigation';
// remotes
import { deleteGameById } from "@/remotes/axois/gameAPI";

interface GameDeleteButtonProps {
  gameId: string;
}
export default function GameDeleteButton({ gameId }: GameDeleteButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (window.confirm('해당 게임을 삭제할까요?')) {
      await deleteGameById(gameId);
      alert('성공적으로 삭제하였습니다.');
      router.push('/');
    }
  };

  return <div className="textBtn" onClick={handleClick}>삭제</div>;
}