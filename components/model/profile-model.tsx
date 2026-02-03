import { UserCircleIcon, BookmarkIcon } from '@heroicons/react/outline';
import { SettingIcon, ChangeIcon } from '../';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const ProfileModel = () => {
  return (
    <Menu.Items className="absolute focus:outline-none">
      <div className="relative top-8 right-[154px]">
        <div className="tooltip absolute right-2  top-[-1px]  -bottom-[10px]"></div>
        <div className="bg-white flex flex-col h-full rounded-md drop-fr w-[198px]  overflow-hidden">
          <Menu.Item>
            {({ active }) => (
              <div
                className={`cursor-pointer transition ${
                  active ? 'bg-gray-50' : ''
                } `}
              >
                <div className="px-4 py-2 flex justify-start font-normal text-sm line-sm font-sans text-gray-900 items-center">
                  <UserCircleIcon className="h-4 text-gray-600" />
                  <div className="flex-auto ml-2">
                    <Link href="/profile">Profile</Link>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <div
                className={`cursor-pointer transition ${
                  active ? 'bg-gray-50' : ''
                } `}
              >
                <div className="px-4 py-2 flex justify-start font-normal text-sm line-sm font-sans text-gray-900 items-center">
                  <BookmarkIcon className="h-4 text-gray-600" />
                  <div className="flex-auto ml-2">
                    <Link href="/save"> Saved publications</Link>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <div
                className={`cursor-pointer transition ${
                  active ? 'bg-gray-50' : ''
                } `}
              >
                <div className="px-4 py-2 flex justify-start font-normal text-sm line-sm font-sans text-gray-900 items-center">
                  <SettingIcon className="h-4 text-gray-600" />
                  <div className="flex-auto ml-2">
                    <Link href="/">setting</Link>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={`cursor-pointer transition ${
                  active ? 'bg-gray-50' : ''
                } `}
              >
                <div className="px-4 py-2 flex justify-start font-normal text-sm line-sm font-sans text-gray-900 items-center">
                  <ChangeIcon className="h-4 text-gray-600" />
                  <div className="flex-auto ml-2">
                    <Link href="/">Change account</Link>
                  </div>
                </div>
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={`cursor-pointer transition ${
                  active ? 'bg-gray-50' : ''
                } `}
              >
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 flex justify-start font-normal text-sm line-sm font-sans text-gray-900 items-center"
                >
                  Logout
                </button>
              </div>
            )}
          </Menu.Item>
        </div>
      </div>
    </Menu.Items>
  );
};
