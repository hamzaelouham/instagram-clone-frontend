export const Suggestion = () => {
  return (
    <div className=" flex flex-col ">
      <div className="flex flex-row justify-between items-center pl-4 py-1 ">
        <h2 className="font-bold text-sm text-gray-400">
          Suggestions For You
        </h2>
        <button className="text-xs font-semibold line-h-sm text-black dark:text-white ring-0">
          See all
        </button>
      </div>

      <div className="flex flex-col py-2">
        <div className="flex flex-row items-center justify-between pl-4 py-1 ">
          <img
            src="/images/avatars/raphael.jpg"
            alt="gfg"
            className="rounded-full w-8 h-8 mr-3"
          />
          <div className="truncate flex-auto">
            <h2 className="font-bold text-sm text-gray-800 dark:text-gray-100">
              nouhaila.nouhaila18
            </h2>
            <p className="font-normal text-xs text-gray-400">Suggestions</p>
          </div>
          <button className="text-blue-400 hover:text-blue-500 transition text-sm font-sans font-medium line-h-sm">
            Follow
          </button>
        </div>

        <div className="flex flex-row items-center justify-between pl-4 py-1 ">
          <img
            src="/images/avatars/orwell.jpg"
            alt="gfg"
            className="rounded-full w-8 h-8 mr-3"
          />
          <div className="truncate flex-auto">
            <h2 className="font-bold text-sm text-gray-800">
              nouhaila.nouhaila18
            </h2>
            <p className="font-normal text-xs text-gray-400">
              New to Instagram
            </p>
          </div>
          <button className="text-blue-400 hover:text-blue-500 transition text-sm font-sans font-medium line-h-sm">
            Follow
          </button>
        </div>

        <div className="flex flex-row items-center justify-between pl-4 py-1 ">
          <img
            src="/images/avatars/default.png"
            alt="gfg"
            className="rounded-full w-8 h-8 mr-3"
          />
          <div className="truncate flex-auto">
            <h2 className="font-bold text-sm text-gray-800">
              nouhaila.nouhaila18
            </h2>
            <p className="font-normal text-xs text-gray-400">Suggestions</p>
          </div>
          <button className="text-blue-400 hover:text-blue-500 transition text-sm font-sans font-medium line-h-sm">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
