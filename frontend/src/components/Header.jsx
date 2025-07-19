import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
  const username = localStorage.getItem("username");
  const isLoggedIn = Boolean(username);

  return (
    <header className="bg-bg text-text px-layoutX py-layoutY border-b border-color-border font-typewriter">
      <div className="flex justify-between items-center">
        <Link to="/" className="hover:underline font-bold text-xl">
          read-me
        </Link>

        <nav className="space-x-4 relative flex items-center">
          <Link to="/search" className="hover:underline">
            search
          </Link>

          {isLoggedIn ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="hover:underline focus:outline-none">
                  my library
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white text-text border border-color-border rounded shadow-lg z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/#"
                            className={`block px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            all books
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/l#"
                            className={`block px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            favourites
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/#"
                            className={`block px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            finished
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/#"
                            className={`block px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            reading
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/#"
                            className={`block px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            planned
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Link to="/#" className="hover:underline">
                @{username}
              </Link>
            </>
          ) : (
            <>
              <Link to="/log-in" className="hover:underline">
                log in
              </Link>
              <Link to="/sign-up" className="hover:underline">
                sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
