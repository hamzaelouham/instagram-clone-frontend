import React from "react";
import { Story } from "./Story";
import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../utils/queries";

export const Stories: React.FC = () => {
  const { data, loading, error } = useQuery(GET_STORIES);

  if (error) {
    return <div className="p-4 text-xs text-gray-400 italic">Unable to load stories</div>;
  }

  const stories = data?.getStories || [];

  return (
    <div className="bg-white dark:bg-dark dark:text-white box-border overflow-y-hidden relative py-[10px] mt-12 md:mt-8 block scroll-smooth scrollbar-thin">
      <div className="flex space-x-1">
        {/* Placeholder for 'Add Story' could go here if we had current user info */}

        {loading && <div className="p-4 text-xs">Loading...</div>}

        {stories.map((story: any) => (
          <Story
            key={story.id}
            me={false /* logic for me? */}
            avatar={story.author.image || "/images/avatars/default.jpg"}
            username={story.author.name}
          />
        ))}

        {!loading && stories.length === 0 && (
          <div className="p-4 text-xs text-gray-500">No stories yet</div>
        )}
      </div>
    </div>
  );
};
