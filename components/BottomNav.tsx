import { Heart, RoundedPlus, HomeIcon } from "./";
import { SearchIcon } from "@heroicons/react/outline";

export const BottomNav = () => {
  return (
    <div className="flex flex-row bg-white shadow-sm h-11 bottom-0 left-0 fixed  w-full items-center md:hidden">
      <div className="h-full flex flex-auto justify-center items-center">
        <HomeIcon />
      </div>
      <div className="h-full flex flex-auto justify-center items-center">
        <SearchIcon className="h-6 " />
      </div>
      <div className="h-full flex flex-auto justify-center items-center">
        <RoundedPlus />
      </div>
      <div className="h-full flex flex-auto justify-center items-center relative">
        <Heart />
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