import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Profile from './Profile';

const Favorite = () => {
  const { favoriteProfiles } = useSelector((store) => store.profiles);

  return (
    <div className="w-5/6 max-w-[800px] text-white mt-24">
      { favoriteProfiles.map((user) => (
        <NavLink key={user.username} to={`https://torre.ai/${user.username}`} target="_blank" className="w-full">
          <Profile user={user} />
        </NavLink>
      ))}
    </div>
  );
};

export default Favorite;
