import { useQuery, useMutation } from '@apollo/client';
import { GET_SUGGESTIONS } from '../utils/queries';
import { FOLLOW_USER_MUTATION } from '../utils/mutations';
import toast from 'react-hot-toast';

export const Suggestion = () => {
  const { data, loading, error } = useQuery(GET_SUGGESTIONS);
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    refetchQueries: [{ query: GET_SUGGESTIONS }],
  });

  if (loading) return null;
  if (error) return null;

  const suggestions = data?.getSuggestions || [];

  const handleFollow = async (userId: string) => {
    try {
      await followUser({ variables: { userId } });
      toast.success('User followed!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className=" flex flex-col ">
      <div className="flex flex-row justify-between items-center pl-4 py-1 ">
        <h2 className="font-bold text-sm text-gray-400">Suggestions For You</h2>
        <button className="text-xs font-semibold line-h-sm text-black dark:text-white ring-0">
          See all
        </button>
      </div>

      <div className="flex flex-col py-2">
        {suggestions.map((user: any) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-between pl-4 py-1 "
          >
            <img
              src={user.image || '/images/avatars/default.jpg'}
              alt={user.name}
              className="rounded-full w-8 h-8 mr-3"
            />
            <div className="truncate flex-auto">
              <h2 className="font-bold text-sm text-gray-800 dark:text-gray-100">
                {user.name}
              </h2>
              <p className="font-normal text-xs text-gray-400">Suggestions</p>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className="text-blue-400 hover:text-blue-500 transition text-sm font-sans font-medium line-h-sm"
            >
              Follow
            </button>
          </div>
        ))}

        {suggestions.length === 0 && (
          <div className="pl-4 py-2 text-xs text-gray-500 italic">
            No suggestions for now
          </div>
        )}
      </div>
    </div>
  );
};
