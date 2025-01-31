import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="flex items-center relative text-white">
              <img
                src="/logo-2.svg"
                alt="task flow logo"
                width={45}
                height={45}
              />
              <span className="font-bold text-lg ml-0.5 block">TaskFlow</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <Link
                className="rounded-md bg-gray-500 px-5 py-2.5 text-sm font-medium text-white shadow"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-500"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
