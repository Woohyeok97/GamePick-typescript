import { Session } from "next-auth";
import Image from 'next/image';
import LogoutButton from "./LogoutButton";

interface UserProfileProps {
  session: Session;
}

export default function UserProfile({ session }: UserProfileProps) {
  const { user } = session;

  return (
    <div className="flex justify-between gap-10 p-3 rounded-md bg-bgGray md:p-5">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="mb-1 overflow-hidden text-xl font-bold sm:text-md whitespace-nowrap overflow-ellipsis">
            {user?.name}
          </span>
          <span className="overflow-hidden text-sm text-fontGray whitespace-nowrap overflow-ellipsis">
            {user?.email}
          </span>
        </div>
        <LogoutButton />
      </div>
      <div>
      {user?.image && <Image src={user?.image} alt='user-img' width={100} height={100} priority/>}
      </div>
    </div>
  );
}
