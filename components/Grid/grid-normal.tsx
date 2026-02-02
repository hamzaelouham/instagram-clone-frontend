import { ReelsIcon } from "../";

interface Props {
  posts: any[];
}

export const NormalGrid = ({ posts }: Props) => {
  if (!posts || posts.length < 5) return null;

  return (
    <div className="grid grid-cols-3 gap-[2px] md:gap-6 pt-[2px] md:pt-6">
      <div className="row-span-1">
        <div>
          <img src={posts[0].imageUrl} className="ex-img" alt="" />
        </div>
        <div>
          <img src={posts[1].imageUrl} className="ex-img" alt="" />
        </div>
      </div>
      <div className="row-span-1 ">
        <div>
          <img src={posts[2].imageUrl} className="ex-img" alt="" />
        </div>
        <div>
          <img src={posts[3].imageUrl} className="ex-img" alt="" />
        </div>
      </div>
      <div className="row-span-1">
        <div className="relative h-full">
          <img src={posts[4].imageUrl} className="ex-img" alt="" />
          <ReelsIcon />
        </div>
      </div>
    </div>
  );
};
