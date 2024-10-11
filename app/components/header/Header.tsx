import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  // This would typically come from your authentication context or state
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://github.com/shadcn.png", // Placeholder avatar URL
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          Sistema de gestión de residencias
        </h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="flex w-full justify-center place-items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold rounded-md text-gray-900 border-0  hover:bg-gray-100">
              <FaUserCircle style={{ color: "gray", fontSize: "40px" }} />
              <span>Leonel Silva</span>
              <FaChevronDown />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <span className="block px-4 py-2 text-lg text-black font-semibold">
                  <b>Mi Cuenta</b>
                </span>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Configuración de cuenta
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/license"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Licencia
                </Link>
              </MenuItem>
              <form action="#" method="POST">
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Salir
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
