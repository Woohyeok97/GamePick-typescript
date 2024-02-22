import axios from 'axios';

// 좋아요 생성
export const createLike = async (gameId: string): Promise<string> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_LIKES_API}/?gameId=${gameId}`);
  return response?.data?.insertedId;
};

// 좋아요 삭제
export const deleteLikeById = async (likeId: string) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_LIKES_API}/${likeId}`);
  return null;
}