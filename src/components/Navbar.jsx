import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex space-x-4">
          <Link
            to="/rated"
            className="text-lg font-semibold text-gray-800 hover:text-gray-600">
            Rated
          </Link>
          <Link
            to="/"
            className="text-lg font-semibold text-gray-800 hover:text-gray-600">
            Home
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/auth"
            className="text-lg font-semibold text-gray-800 hover:text-gray-600">
            Auth
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
