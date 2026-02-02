import Link from "next/link";
import { useSession } from "next-auth/react";

export const MiniProfile = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-row items-center justify-between mb-[10px]">
      <img
        src={data?.user?.image || "/images/avatars/default.png"}
        alt="gfg"
        className="rounded-full w-14 h-14"
      />
      <div className="flex flex-col justify-center ml-3 flex-auto">
        <div className="text-sm font-sans font-semibold line-h-sm  text-black dark:text-white">
          {data?.user?.name}
        </div>
        <p className="text-sm font-sans font-normal text-gray-400  dark:text-gray-300 line-h-sm">
          {data?.user?.email.split("@")[0]}
        </p>
      </div>

      <button className="text-blue-500 hover:text-blue-400 transition text-sm font-sans font-medium line-h-sm">
        <Link href="/">Switch</Link>
      </button>
    </div>
  );
};
