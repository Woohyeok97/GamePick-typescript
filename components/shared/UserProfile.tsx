import { Session } from "next-auth";
import Image from 'next/image';

interface UserProfileProps {
  session: Session;
}

export default function UserProfile({ session }: UserProfileProps) {
  const { user } = session;

  return (
    <div className="flex justify-between gap-10 p-5 rounded-md bg-bgGray">
      <div className="flex flex-col flex-1 min-w-0">
        <span className="mb-1 overflow-hidden text-xl font-bold sm:text-md whitespace-nowrap overflow-ellipsis">
          {user?.name}
        </span>
        <span className="overflow-hidden text-fontGray whitespace-nowrap overflow-ellipsis">
          {user?.email}
        </span>
      </div>
      <div>
      {user?.image && <Image src={user?.image} alt='user-img' width={100} height={100} priority/>}
      </div>
    </div>
  );
}
