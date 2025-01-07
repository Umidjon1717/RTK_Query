import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-bold">My Website</div>
          <div className="flex space-x-6">
            <Link
              to="/home"
              className="hover:text-blue-200 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-200 transition duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
