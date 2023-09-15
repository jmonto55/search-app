import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { filterProfiles } from '../redux/profiles/profilesSlice';
import Profile from './Profile';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [showProfiles, setShowProfiles] = useState(false);
  const dispatch = useDispatch();
  const { profilesList } = useSelector((store) => store.profiles);
  const refSearch = useRef();

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    setShowProfiles(true);
    dispatch(filterProfiles(newSearch));
  };

  useEffect(() => {
    const handler = (event) => {
      if (showProfiles && refSearch.current && !refSearch.current.contains(event.target)) {
        setShowProfiles(false);
      }
    };
    document.addEventListener('mousedown', handler);
  }, [showProfiles]);

  return (
    <div ref={refSearch} className="w-5/6 bg-[#010101] mt-[100px] flex flex-col items-center">
      <div className="w-5/6 max-w-[800px] rounded-full border border-neutral-400 py-3 px-5 flex items-center">
        <span className="material-symbols-outlined text-[#a6a6a6] mr-3">
          person_search
        </span>
        <input
          type="text"
          placeholder="Search people by name"
          className="bg-[#010101] text-[#a6a6a6] w-full focus:outline-none"
          onChange={handleSearch}
        />
      </div>
      {showProfiles && (
        <ul className="w-5/6 max-w-[800px] h-[500px] flex flex-col items-center text-white overflow-y-scroll">
          {profilesList.map((user) => (
            <NavLink onClick={() => setShowProfiles(false)} key={user.username} to={`https://torre.ai/${user.username}`} target="_blank" className="w-full">
              <Profile user={user} />
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
