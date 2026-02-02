import React from "react";

interface Props {
  avatar: string;
  username: string;
  me: number | string | boolean;
}

export const Story = ({ avatar, username, me }: Props) => {
  return (
    <div className="box-border items-center relative self-center cursor-pointer  px-2 flex flex-col">
      <span className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 w-[66px] h-[66px] p-[2px] flex justify-center relative rounded-full">
        <img
          src={avatar}
          className="rounded-full border-2 border-white object-cover"
          alt="stroy"
        />
      </span>
      {me && (
        <div className="absolute top-11 right-2 rounded-full bg-blue-600 text-md flex items-center justify-center h-4 w-4 font-semibold border-white border font-mono text-white">
          {/* <PlusIcon className="h-4 w-4 text-white" /> */}+
        </div>
      )}

      <div className="text-xs w-14 truncate text-center">{username}</div>
    </div>
  );
};
