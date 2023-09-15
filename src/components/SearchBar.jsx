const SearchBar = () => {
  return (
    <div className="h-1/2 flex items-center justify-center">
      <div className="w-5/6 max-w-[800px] rounded-full border border-neutral-400 py-3 px-5 flex items-center">
        <span className="material-symbols-outlined text-[#a6a6a6] mr-3">
          person_search
        </span>
        <input
          type="text"
          placeholder="Search people by name"
          className="bg-[#010101] text-[#a6a6a6] w-full focus:outline-none"
          // onChange={(e) => dispatch(filterStocks(e.target.value))}
          style={{ position: 'relative' }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
