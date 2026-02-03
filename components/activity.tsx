import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_NOTIFICATIONS,
  NOTIFICATION_CREATED_SUBSCRIPTION,
} from '../utils/queries';
import { useSession } from 'next-auth/react';

const getActionMessage = (type: string) => {
  switch (type) {
    case 'FOLLOW':
      return 'started following you';
    case 'LIKE':
      return 'liked your post';
    case 'COMMENT':
      return 'commented on your post';
    default:
      return 'interacted with you';
  }
};

const ActivityCard = ({ notification }: { notification: any }) => (
  <div
    className={`flex items-center flex-row px-4 py-3 last:mb-[30px] ${!notification.read ? 'bg-blue-50' : ''}`}
  >
    <div className="h-11 w-11 relative">
      <img
        src={notification.sender.image || '/images/avatars/orwell.jpg'}
        className="absolute object-cover rounded-full h-full w-full"
        alt={notification.sender.name}
      />
    </div>
    <div className="flex flex-col mx-3 break-words flex-auto">
      <h1 className="truncate font-bold text-sm line-sm">
        {notification.sender.name}
      </h1>
      <h3 className="text-sm font-normal line-sm">
        {getActionMessage(notification.type)}
        <span className="text-gray-400 text-xs ml-2">
          {new Date(notification.createdAt).toLocaleDateString()}
        </span>
      </h3>
    </div>
    {notification.post && (
      <div className="h-10 w-10">
        <img
          src={notification.post.imageUrl}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
    )}
    {!notification.post && (
      <button className="ring-0 px-[9px] py-[5px] font-bold text-white rounded font-sans line-sm text-sm bg-blue-500">
        Follow
      </button>
    )}
  </div>
);

export const Activity = () => {
  const { data: session } = useSession();
  const { data, loading, subscribeToMore } = useQuery(GET_NOTIFICATIONS, {
    skip: !session,
  });

  useEffect(() => {
    if (!session) return;

    return subscribeToMore({
      document: NOTIFICATION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotification = subscriptionData.data.notificationCreated;

        // Check if already in list
        if (prev.getNotifications.find((n: any) => n.id === newNotification.id))
          return prev;

        return {
          ...prev,
          getNotifications: [newNotification, ...prev.getNotifications],
        };
      },
    });
  }, [session, subscribeToMore]);

  if (loading)
    return <div className="p-4 text-center">Loading notifications...</div>;

  const notifications = data?.getNotifications || [];

  return (
    <div className="h-full">
      {/* Activity header */}
      <div className="flex flex-col bg-white top-0 left-0 right-0 sticky z-20 border-b-gray-300">
        <header className="shadow-sm border-b h-11 px-4 flex justify-center items-center">
          <h3 className="font-semibold text-md">Activity</h3>
        </header>
      </div>
      <div className="flex flex-col">
        {notifications.length === 0 ? (
          <div className="p-10 text-center text-gray-500 text-sm">
            No activity yet.
          </div>
        ) : (
          <div>
            <h1 className="mt-2 ml-2 p-1 pb-0 font-bold text-sm text-gray-900">
              Recent
            </h1>
            {notifications.map((notif: any) => (
              <ActivityCard key={notif.id} notification={notif} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
