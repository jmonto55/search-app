import { NavLink } from 'react-router-dom';
import links from '../constants';

const NavBar = () => {
  return (
    <nav className="flex w-full gap-4 text-[#eaeaea] items-center justify-center bg-[#27292d] pt-2">
      <div>
        <h2 className="text-xl">Search</h2>
      </div>
      <ul className="flex items-center">
        {links.map((link) => (
          <button
            type="button"
            className="h-[53px]"
            key={link.text}
          >
            <NavLink
              to={link.path}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#010101' : '#27292d',
                borderTop: isActive ? '2px solid #eaeaea' : 'none',
                })}
              className="p-4 px-8 border-[#eaeaea] rounded-t-lg" 
            >
              {link.text}
            </NavLink>
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
