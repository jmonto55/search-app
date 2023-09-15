import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Favorite from './components/Favorite';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className="h-screen bg-[#010101]">
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
};

export default App;
