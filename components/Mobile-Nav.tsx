import { Heart, RoundedPlus, HomeIcon } from "./";
import { HeartIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";

export const Navigation = () => {
  return (
    <div className="flex flex-row bg-white dark:bg-dark  h-11 bottom-0 left-0 fixed  w-full shadow-sm items-center md:hidden">
      <div className="h-full flex flex-auto justify-center items-center cursor-pointer">
        <HomeIcon />
      </div>
      <div className="h-full flex flex-auto justify-center items-center">
        <Link href="/explore/">
          <SearchIcon className="h-6 icons" />
        </Link>
      </div>
      <div className="h-full flex flex-auto justify-center items-center">
        <RoundedPlus />
      </div>
      <div className="h-full flex flex-auto justify-center items-center relative">
        <Link href="/notification">
          <HeartIcon className="icons" />
        </Link>
        <div className="absolute bg-red-600 mx-auto h-1 w-1 bottom-[5px] rounded-sm -translate-x-[-0.5px]"></div>
      </div>
      <div className="h-full flex flex-auto justify-center items-center">
        <img
          src="/images/avatars/default.png"
          alt="avatar"
          className="h-6 w-6 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};
