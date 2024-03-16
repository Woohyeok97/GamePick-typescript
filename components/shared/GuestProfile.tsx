import Link from 'next/link';

export default function GuestProfile() {
  return (
    <div className="flex flex-col justify-between items-center p-5 min-h-[100px] rounded-md bg-bgGray">
      <span className="mb-4 font-bold text-fontGray">로그인하고 관심게임 선택하기</span>

      <Link href='/login'>
        <button className='btn'>로그인</button>
      </Link>
    </div>
  );
}