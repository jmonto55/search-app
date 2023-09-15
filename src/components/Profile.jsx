import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/profiles/profilesSlice';
import { createFavoriteProfile } from '../redux/profiles/profilesSlice';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  
  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(user));

    const profileData = {
      name: user.name,
      username: user.username,
      role: user.professionalHeadline,
      picture: user.imageUrl,
      verified: user.verified,
    };

    dispatch(createFavoriteProfile(profileData));
  };

  return (
    <div className="z-10 flex items-center w-full bg-neutral-700 cursor-pointer hover:bg-neutral-600 p-3 px-4">
      <div className="">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={user.name} className="w-[35px] mr-4 rounded-full border-2 border-neutral-400" />
          ) : (
          <span className="material-symbols-outlined w-[35px] h-[35px] mr-4 flex items-center justify-center rounded-full border-2 border-neutral-400">person</span>
        )}
      </div>
      <div className="w-full flex items-center">
        <div className="w-full flex flex-col leading-tight">
          <div className="flex items-center">
            <h2>{user.name}</h2>
            {user.verified && (
                <span className="material-symbols-outlined text-sm ml-2 mt-1">verified</span>
            )}
          </div>
          <p className="text-neutral-400 text-sm">
            {user.professionalHeadline ? user.professionalHeadline.split(' ').slice(0, 4).join(' ') : ''}
          </p>
        </div>
        <span
          className="material-symbols-outlined text-[20px] justify-self-end z-40"
          onClick={handleFavorite}
        >
          grade
        </span>
      </div>
    </div>
  );
};

export default Profile;
