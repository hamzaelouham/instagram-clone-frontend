import Link from 'next/link';
import { HeartIcon, SearchIcon } from '@heroicons/react/outline';
import { RoundedPlus, HomeIcon } from './';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {
  GET_NOTIFICATIONS,
  NOTIFICATION_CREATED_SUBSCRIPTION,
} from '../utils/queries';

export const Navigation = () => {
  const { data: session, status } = useSession();
  const { data: notifData, subscribeToMore } = useQuery(GET_NOTIFICATIONS, {
    skip: status !== 'authenticated',
  });

  useEffect(() => {
    // Only subscribe when fully authenticated with a valid token
    if (status !== 'authenticated' || !session?.user?.accessToken) return;

    const unsubscribe = subscribeToMore({
      document: NOTIFICATION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotif = subscriptionData.data.notificationCreated;
        if (prev.getNotifications.find((n: any) => n.id === newNotif.id))
          return prev;
        return {
          ...prev,
          getNotifications: [newNotif, ...prev.getNotifications],
        };
      },
    });
    return unsubscribe;
  }, [status, session?.user?.accessToken, subscribeToMore]);

  const unreadCount =
    notifData?.getNotifications.filter((n: any) => !n.read).length || 0;

  return (
    <div className="flex flex-row bg-white dark:bg-dark  h-11 bottom-0 left-0 fixed  w-full shadow-sm items-center md:hidden">
      <div className="h-full flex flex-auto justify-center items-center cursor-pointer">
        <Link href="/">
          <HomeIcon />
        </Link>
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
          <div className="relative">
            <HeartIcon className="icons" />
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full border border-white"></div>
            )}
          </div>
        </Link>
      </div>
      <div className="h-full flex flex-auto justify-center items-center">
        <img
          src={session?.user?.image || '/images/avatars/default.png'}
          alt="avatar"
          className="h-6 w-6 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};
