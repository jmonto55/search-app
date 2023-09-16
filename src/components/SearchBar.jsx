import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { filterProfiles } from '../redux/profiles/profilesSlice';
import { createLastSearched, fetchLastSearched } from '../redux/profiles/profilesSlice';
import Profile from './Profile';

const SearchBar = () => {
  const [showProfiles, setShowProfiles] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const dispatch = useDispatch();
  const { profilesList, lastProfiles, status } = useSelector((store) => store.profiles);
  const refSearch = useRef();

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    setShowProfiles(true);
    setShowRecent(false);
    dispatch(filterProfiles(newSearch));
  };

  const showLastSearches = () => {
    const searchElement = document.getElementById('search');
    const searchElementTwo = document.querySelector('.search_two');
    const searchElementThree = document.querySelector('.search_three');
    if (searchElement) {
      searchElement.style.borderColor = '#cddc39';
    }
    if (searchElementTwo) {
      searchElementTwo.style.color = '#cddc39';
    }
    if (searchElementThree) {
      searchElementThree.style.display = 'block';
    }
    setShowRecent(true);
  };

  const handleClick = (user) => {
    const profileData = {
      name: user.name,
      username: user.username,
      professionalHeadline: user.professionalHeadline,
      imageUrl: user.imageUrl,
      verified: user.verified,
    };
    setShowProfiles(false);
    setShowRecent(false);
    dispatch(createLastSearched(profileData));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchLastSearched());
  }, [dispatch]);

  useEffect(() => {
    const handler = (event) => {
      if (showProfiles && refSearch.current && !refSearch.current.contains(event.target)) {
        setShowProfiles(false);
        setShowRecent(false);
      }
      if (showRecent && refSearch.current && !refSearch.current.contains(event.target)) {
        setShowProfiles(false);
        setShowRecent(false);
      }
      const searchElement = document.querySelector('.search');
      const searchElementTwo = document.querySelector('.search_two');
      const searchElementThree = document.querySelector('.search_three');

      if (searchElement) {
        searchElement.style.borderColor = '#a6a6a6';
      }
      if (searchElementTwo) {
        searchElementTwo.style.color = '#a6a6a6';
      }
      if (searchElementThree) {
        searchElementThree.style.display = 'none';
      }
    };
    document.addEventListener('mousedown', handler);
  }, [showProfiles, showRecent]);

  return (
    <div ref={refSearch} className="w-5/6 max-w-[800px] bg-[#010101] mt-[40px] xs:mt-[90px] flex flex-col items-center">
      <div id="search" className="relative search w-full rounded-full border border-neutral-400 py-3 px-5 flex items-center">
        <p className="hidden search_three absolute -top-2 left-7 px-1 text-[12px] bg-[#010101] text-[#cddc39]">Search people by name</p>
        <span className="search_two material-symbols-outlined text-[#a6a6a6] mr-3">
          person_search
        </span>
        <input
          type="text"
          placeholder="Search people by name"
          className="bg-[#010101] text-[#a6a6a6] w-full focus:outline-none focus:placeholder:text-neutral-600"
          onChange={handleSearch}
          onFocus={showLastSearches}
        />
      </div>
      {status === 'loading' ? (
        <div className="w-full h-[5px] bg-[#cddc39] animate-pulse-fast" />
      ) : (
        <>
          {lastProfiles.length > 0 && showRecent && (
            <h2 className="w-full text-white bg-neutral-700 p-4 font-bold">Recent</h2>
          )}
          {showProfiles && (
            <ul className="w-full h-[500px] flex flex-col items-center text-white overflow-y-scroll">
              {profilesList.map((user) => (
                <NavLink onClick={() => handleClick(user)} key={user.username} to={`https://torre.ai/${user.username}`} target="_blank" className="w-full">
                  <Profile user={user} />
                </NavLink>
              ))}
            </ul>
          )}
          {showRecent && (
            <ul className="w-full max-h-[390px] sm:max-h-[450px] flex flex-col items-center text-white overflow-y-scroll">
              {lastProfiles.map((user) => (
                <NavLink onClick={handleClick} key={user.username} to={`https://torre.ai/${user.username}`} target="_blank" className="w-full">
                  <Profile user={user} />
                </NavLink>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;
