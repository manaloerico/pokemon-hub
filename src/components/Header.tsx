import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pokémon", path: "/pokemon" },
    { name: "Dogs", path: "/dogs" },
    { name: "Cats", path: "/cats" },
    { name: "Jokes", path: "/jokes" },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Site Name */}
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
          Funverse
        </Link>

        {/* Navigation */}
        <nav className="space-x-4 hidden md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-blue-500 ${
                  isActive ? "bg-blue-700 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
