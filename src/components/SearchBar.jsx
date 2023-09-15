import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterProfiles } from '../redux/profiles/profilesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showData, setShowData] = useState(false);
  const dispatch = useDispatch();
  const { profilesList } = useSelector((store) => store.profiles);

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setShowData(true);
    dispatch(filterProfiles(newQuery));
  };

  return (
    <div className="h-1/2 flex items-center justify-center">
      <div className="w-5/6 max-w-[800px] rounded-full border border-neutral-400 py-3 px-5 flex items-center">
        <span className="material-symbols-outlined text-[#a6a6a6] mr-3">
          person_search
        </span>
        <input
          type="text"
          value={query}
          placeholder="Search people by name"
          className="bg-[#010101] text-[#a6a6a6] w-full focus:outline-none"
          onChange={handleSearch}
          style={{ position: 'relative' }}
        />
      </div>
      {showData && (
        <section className="w-full h-full text-white">
          { profilesList.map((user) => (
            user.username
          ))}
        </section>
      )}
    </div>
  );
};

export default SearchBar;
