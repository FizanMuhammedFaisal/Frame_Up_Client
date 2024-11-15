import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCart2 } from "react-icons/bs";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartIcon, UserIcon } from "lucide-react";
import Logo from "./Animations/Logo";
import AccountNavbar from "../common/AccountNavbar";
import SearchBar from "./SearchBar.jsx";

const products = [
  {
    name: "Artists",
    description: "Get a better understanding of your traffic",
    href: "/artists",
  },
  {
    name: "Orders",
    description: "Speak directly to your customers",
    href: "/account/order-history",
  },
  {
    name: "WishList",
    description: "Your customers' data will be safe and secure",
    href: "/wishlist",
  },
];

const navbarData = [
  { name: "Collections", href: "/all", icon: ShoppingBagIcon },
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Artists", href: "/about-us", icon: UserGroupIcon },
];

const MLogo = React.memo(Logo);
const MSearchBar = React.memo(SearchBar);
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleMouseEnter = useCallback((name) => {
    setActiveDropdown(name);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((name) => {
    setActiveDropdown((prevState) => (prevState === name ? null : name));
  }, []);

  const sidebarVariants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-customColorPrimary shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        <div className="flex mb-1 lg:flex-1">
          <MLogo />
        </div>
        <div className="flex items-center justify-end flex-1 lg:justify-center">
          <div className="lg:hidden mr-2">
            <MSearchBar
              setIsSearchFocused={setIsSearchFocused}
              isSearchFocused={isSearchFocused}
            />
          </div>
          <div className="hidden lg:flex lg:gap-x-11">
            <div className="relative group">
              <button
                className="flex items-center pb-1 gap-x-1 text-base font-primary leading-6 text-textPrimary font-normal group-hover:text-gray-600"
                onMouseEnter={() => handleMouseEnter("shop")}
                onMouseLeave={handleMouseLeave}
              >
                Shop
                <ChevronDownIcon
                  className={`h-5 w-5 flex-none text-gray-400 transition-transform duration-200 ${
                    activeDropdown === "shop" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "shop" && (
                <div
                  onMouseEnter={() => handleMouseEnter("shop")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute left-0 w-screen max-w-md bg-customColorSecondary shadow-lg ring-1 ring-gray-900/5 z-10"
                >
                  <div className="p-4">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block rounded-lg p-3 hover:bg-gray-50"
                      >
                        <p className="font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navbarData.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-base font-primary leading-6 text-textPrimary font-normal hover:text-textPrimary duration-150 hover:border-b-2 border-black"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-textPrimary"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center space-x-4 ml-auto">
            <MSearchBar
              setIsSearchFocused={setIsSearchFocused}
              isSearchFocused={isSearchFocused}
            />

            <AccountNavbar />

            <motion.button
              className="text-lg text-textPrimary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/wishlist")}
            >
              <HeartIcon size={22} />
            </motion.button>
            <motion.button
              className="text-2xl text-textPrimary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/cart")}
            >
              <div className="flex items-center">
                <BsCart2 />
                {items.length > 0 && (
                  <span className="ml-1 text-sm">({items.length})</span>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-y-0 right-0 z-50 w-4/5 overflow-y-auto bg-customColorSecondary sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <h1 className="font-secondary font-bold text-2xl text-textPrimary">
                    Frame Up
                  </h1>
                </Link>

                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-textPrimary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <motion.div
                      className="-mx-3"
                      variants={itemVariants}
                      transition={{ delay: 0.1 }}
                    >
                      <button
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-primary leading-7 text-gray-900 hover:bg-gray-100"
                        onClick={() => toggleDropdown("shop")}
                      >
                        Shop
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-none text-gray-400 transition-transform duration-200 ${
                            activeDropdown === "shop" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === "shop" && (
                        <motion.div className="mt-1 space-y-1" layout>
                          {products.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>

                    {navbarData.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center -mx-3 rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-6 w-6 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      to="/login"
                      className="block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <MobileBottomBar items={items} />
    </header>
  );
}

function MobileBottomBar({ items }) {
  const navigate = useNavigate();
  const location = useLocation();

  const bottomBarItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Wishlist", href: "/wishlist", icon: HeartIcon },
    { name: "Cart", href: "/cart", icon: BsCart2, badge: items.length },
    { name: "Account", href: "/account", icon: UserIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-customColorPrimary shadow-md lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {bottomBarItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center justify-center w-full h-full ${
              location.pathname === item.href
                ? "text-customColorTertiary"
                : "text-textPrimary"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
            {item.badge > 0 && (
              <span className="absolute top-2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
