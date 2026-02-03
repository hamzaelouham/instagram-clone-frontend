import React, { useState } from 'react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as FillHeartIcon } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { TOGGLE_LIKE_MUTATION, ADD_COMMENT_MUTATION } from '../utils/mutations';
import { GET_POST } from '../utils/queries';
import toast from 'react-hot-toast';

interface postProps {
  postId: string;
  username: string;
  imageUrl: string;
  userImage: string;
  caption: string;
  likesCount: number;
  hasLiked: boolean;
  comments: any[];
}

export const Post = ({
  postId,
  username,
  userImage,
  imageUrl,
  caption,
  likesCount,
  hasLiked,
  comments: initialComments,
}: postProps) => {
  const [comment, setComment] = useState('');

  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    refetchQueries: [{ query: GET_POST }],
  });

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    refetchQueries: [{ query: GET_POST }],
  });

  const handleLike = async () => {
    try {
      await toggleLike({ variables: { id: postId } });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment({ variables: { text: comment, postId } });
      setComment('');
      toast.success('Comment added!');
    } catch (err: any) {
      toast.error(err.message);
    }
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
          {hasLiked ? (
            <FillHeartIcon
              className="btn text-red-500 transition ease-out"
              onClick={handleLike}
            />
          ) : (
            <HeartIcon
              className="btn transition ease-in"
              onClick={handleLike}
            />
          )}

          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <div className="px-5 pt-2">
        <p className="font-bold text-sm">{likesCount} likes</p>
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* comments list */}
      {initialComments && initialComments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {initialComments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.author.image || '/images/avatars/default.jpg'}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.author.name}</span>{' '}
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <form className=" flex items-center p-4" onSubmit={handleComment}>
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="add a comment..."
          className="dark:bg-dark dark:text-white border-none flex-1 focus:ring-0 outline-none"
        />

        <button
          type="submit"
          disabled={!comment.trim()}
          className="font-somiblod px-1 h-12 w-12 text-blue-500 dark:text-white disabled:text-blue-200 hover:text-blue-400 transition text-sm font-sans font-medium line-h-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
};
