import React from "react";
import {
  HeartIcon,
  PaperAirplaneIcon,
  SearchIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { HomeIcon as HomeIconActive } from "@heroicons/react/solid";
import {
  CameraIcon,
  RoundedPlus,
  ProfileModel,
  Model,
  ExploreIcon,
  ActiveExploreIcon,
} from "./";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS, NOTIFICATION_CREATED_SUBSCRIPTION } from "../utils/queries";

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const { data: notifData, subscribeToMore } = useQuery(GET_NOTIFICATIONS, {
    skip: !session,
  });

  React.useEffect(() => {
    if (!session) return;
    return subscribeToMore({
      document: NOTIFICATION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotif = subscriptionData.data.notificationCreated;
        if (prev.getNotifications.find((n: any) => n.id === newNotif.id)) return prev;
        return {
          ...prev,
          getNotifications: [newNotif, ...prev.getNotifications],
        };
      },
    });
  }, [session, subscribeToMore]);

  const unreadCount = notifData?.getNotifications.filter((n: any) => !n.read).length || 0;

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Model closeModal={closeModal} isOpen={isOpen} />
      <nav>
        <div className=" bg-white dark:bg-dark shadow-sm top-0 left-0 fixed z-10 flex items-center flex-row h-11 w-full justify-between px-4 md:hidden">
          <div className="flex items-center basis-8 flex-row">
            <CameraIcon />
          </div>
          <div className="flex items-center flex-row">
            <div className="relative cursor-pointer">
              <Link href="/">
                <img src="/images/logo.png" alt="logo" className="h-[29px]" />
              </Link>
            </div>
          </div>

          <div className="relative icons">
            <PaperAirplaneIcon className="icons rotate-45 " />
            <div className="bag">4</div>
          </div>
        </div>
        <div className="hidden top-0 fixed z-10 w-full h-14 md:flex flex-col justify-center items-center bg-white dark:bg-dark shadow-sm">
          <div className="flex items-center  justify-between w-full  px-5 h-full max-w-[975px]">
            <div className="relative cursor-pointer">
              <Link href="/">
                <img src="/images/logo.png" alt="logo" className="h-[29px]" />
              </Link>
            </div>
            <div className="hidden md:inline-flex">
              <div className="mt-1 relative p-3 rounded-md  ">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input className="input" type="text" placeholder="Search" />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 ">
              <Link href="/">
                {router.pathname === "/" ? (
                  <HomeIconActive className="icons " />
                ) : (
                  <HomeIcon className="icons " />
                )}
              </Link>

              <div className="relative icons ">
                <PaperAirplaneIcon className="icons rotate-45 " />
                <div className="bag">4</div>
              </div>
              {/* <PlusCircleIcon className="icons xs-hidden" /> */}
              <button onClick={openModal}>
                <RoundedPlus />
              </button>

              <Link href="/explore">
                {router.pathname === "/explore" ? (
                  <ActiveExploreIcon className="icons" />
                ) : (
                  <ExploreIcon className="icons" />
                )}
              </Link>

              <Link href="/notification">
                <div className="relative">
                  <HeartIcon className="icons" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-dark font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </div>
                  )}
                </div>
              </Link>

              <Menu as="div" className="relative inline-block">
                <Menu.Button className="cursor-pointer focus:outline-none">
                  <img
                    src={session?.user?.image || "/images/avatars/default.png"}
                    alt="avatar"
                    className="h-6 w-6 rounded-full cursor-pointer"
                  />
                </Menu.Button>
                <ProfileModel />
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
