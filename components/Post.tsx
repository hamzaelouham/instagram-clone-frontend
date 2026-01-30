import React from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FillHeartIcon } from "@heroicons/react/solid";

interface postProps {
  postId: string | number;
  username: string;
  imageUrl: string;
  userImage: string;
  caption: string;
}

export const Post = ({
  postId,
  username,
  userImage,
  imageUrl,
  caption,
}: postProps) => {
  const [liked, setLiked] = React.useState<boolean>(false);
  const likePost = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-dark dark:text-white my-7 border dark:border-none rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImage || `/images/avatars/default.png`}
          alt={username}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold ">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      <img
        src={imageUrl}
        alt={caption}
        className="w-full h-[400px] md:h-[450px] object-cover"
      />
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4 ">
          {liked ? (
            <FillHeartIcon
              className="btn text-red-500 transition ease-out"
              onClick={likePost}
            />
          ) : (
            <HeartIcon className="btn transition ease-in" onClick={likePost} />
          )}

          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* comment */}

      <form className=" flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          placeholder="add a comment..."
          className="dark:bg-dark dark:text-white border-none flex-1 focus:ring-0 outline-none"
        />

        <button
          type="submit"
          className="font-somiblod px-1 h-12 w-12 text-blue-500 dark:text-white  hover:text-blue-400 transition text-sm font-sans font-medium line-h-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
};
