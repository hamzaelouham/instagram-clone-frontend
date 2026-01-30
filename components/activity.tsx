import React from "react";

interface ActivityItem {
  id: number;
  username: string;
  avatar: string;
  action: string;
  isFollowing: boolean;
}

// Mock data - replace with API data later
const activityData: ActivityItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  username: "hz__hamza",
  avatar: "/images/avatars/orwell.jpg",
  action: "following you",
  isFollowing: false,
}));

const ActivityCard = ({ item }: { item: ActivityItem }) => (
  <div className="flex items-center flex-row px-4 py-3 last:mb-[30px]">
    <div className="h-11 w-11 relative">
      <img
        src={item.avatar}
        className="absolute object-cover rounded-full"
        alt={item.username}
      />
    </div>
    <div className="flex flex-col mx-3 break-words flex-auto">
      <h1 className="truncate font-bold line-sm">{item.username}</h1>
      <h3 className="text-sm font-normal line-sm">{item.action}</h3>
    </div>
    <button className="ring-0 px-[9px] py-[5px] font-bold text-white rounded font-sans line-sm text-sm bg-blue-500">
      Follow
    </button>
  </div>
);

export const Activity = () => {
  return (
    <div className="h-full">
      {/* Activity header */}
      <div className="flex flex-col bg-white top-0 left-0 right-0 sticky z-20 border-b-gray-300">
        <header className="shadow-sm border-b h-11 px-4 flex justify-center items-center">
          <h3 className="font-semibold text-md">Activity</h3>
        </header>
      </div>
      <div className="flex flex-col">
        <div>
          <h1 className="mt-2 ml-2 p-1 pb-0 font-bold text-sm text-gray-900">
            This week
          </h1>
          {activityData.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
