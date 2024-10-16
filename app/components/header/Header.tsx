"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleLogout } from "@/security/logout";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    name: "",
    lastName: "",
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo); // Parse the string into an object
      setIsLoggedIn(true);
      setLoggedUser({
        name: parsedUserInfo.name || "",
        lastName: parsedUserInfo.lastName || "",
      });
    }
  }, []);

  return (
    <>
      {isLoggedIn && (
        <header className="bg-background border-b">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">
              Sistema de gestión de residencias
            </h1>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="b-header__button">
                  <FaUserCircle style={{ color: "gray", fontSize: "40px" }} />
                  <span>{loggedUser.name + " " + loggedUser.lastName}</span>
                  <FaChevronDown />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <div className="py-1">
                  <MenuItem>
                    <span className="block px-4 py-2 text-lg text-black font-semibold">
                      <b>Mi Cuenta</b>
                    </span>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/license"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Licencia
                    </Link>
                  </MenuItem>
                  <form action="#" method="POST">
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        type="submit"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
      )}
    </>
  );
}
