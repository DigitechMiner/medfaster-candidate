"use client";

import { ChevronDown, Menu, X, Download } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Why Medfaster?", href: "/coming_soon" },
  { label: "Our Subscriptions", href: "/coming_soon" },
  { label: "Getting Hired", href: "/coming_soon" },
  { label: "Find Jobs", href: "/nearby_jobs" },
];

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Set active state based on current pathname
  useEffect(() => {
    const currentLink = navLinks.find((link) => {
      if (link.href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(link.href);
    });
    
    if (currentLink) {
      setActive(currentLink.label);
    }
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="w-full bg-white rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl ">
   <header className="relative w-full flex items-center justify-between p-2 md:p-4 lg:p-6 xl:p-8 px-4 md:px-8 lg:px-16 xl:px-16">
      {/* Left Side - Mobile Menu + Logo */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <Button
          className="xl:hidden rounded p-2 z-20"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {/* Logo */}
        <div className="flex-shrink-0 w-40 md:w-48 lg:w-[200px] flex items-center">
          <Image
            src="/images/ui/medfaster-logo.png"
            height={50}
            width={200}
            alt="MeDFaster"
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden xl:flex bg-gray-100 rounded-full p-1 items-center gap-1 relative">
        {navLinks.map((link) => {
          const hasSubmenu = link.submenu && link.submenu.length > 0;
          const isSubmenuOpen = openSubmenu === link.label;
          return (
            <div key={link.label} className="relative">
              <Button
                className={`rounded-full font-medium px-3 py-2 whitespace-nowrap inline-flex items-center gap-1 ${
                  active === link.label
                    ? "bg-[#F4781B] text-white"
                    : "bg-transparent text-gray-700"
                }`}
                variant="ghost"
                asChild
                onClick={() => {
                  if (hasSubmenu) {
                    toggleSubmenu(link.label);
                  } else {
                    setActive(link.label);
                    setOpenSubmenu(null);
                  }
                }}
              >
                <div className="inline-flex items-center gap-1">
                  <Link href={link.href}>{link.label}</Link>
                  {hasSubmenu && (
                    <ChevronDown
                      className={`${
                        isSubmenuOpen ? "rotate-180" : ""
                      } transition-transform`}
                      size={18}
                    />
                  )}
                </div>
              </Button>

              {/* Submenu */}
              {hasSubmenu && isSubmenuOpen && (
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-2 min-w-[150px] z-50 flex flex-col border border-gray-200">
                  {link.submenu!.map((subLink) => (
                    <Link
                      key={subLink.label}
                      href={subLink.href}
                      onClick={() => {
                        setActive(subLink.label);
                        setOpenSubmenu(null);
                      }}
                      className={`px-4 py-2 text-gray-700 text-sm rounded-md whitespace-nowrap font-medium ${
                        active === subLink.label
                          ? "bg-[#F4781B] text-white"
                          : "hover:bg-[#F4781B] hover:text-white"
                      }`}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Action Buttons - Desktop Only */}
      <div className="flex items-center gap-2">
        <CustomButton className="hidden md:flex my-0 py-1" rightIcon={Download}>
          Download App
        </CustomButton>
        <CustomButton className="hidden md:flex my-0 py-2" variant="secondary">
          Find Jobs & Login
        </CustomButton>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 w-full max-w-sm min-h-[calc(100vh-100%-30px)] z-50 flex flex-col items-center bg-white border-b rounded-lg shadow-lg xl:hidden justify-between">
          <div className="w-full max-w-sm py-4 px-4">
            {navLinks.map((link) => {
              const hasSubmenu = link.submenu && link.submenu.length > 0;
              const isSubmenuOpen = openSubmenu === link.label;
              return (
                <div key={link.label} className="mb-2">
                  <Button
                    className={`rounded-full font-medium w-full my-1 ${
                      active === link.label
                        ? "bg-[#F4781B] text-white"
                        : "bg-transparent text-gray-700 hover:bg-[#F4781B]-100"
                    }`}
                    variant="ghost"
                    asChild
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleSubmenu(link.label);
                      } else {
                        setActive(link.label);
                        setMobileOpen(false);
                        setOpenSubmenu(null);
                      }
                    }}
                  >
                    <span className="inline-flex items-center gap-1 w-full justify-between">
                      <Link href={link.href}>{link.label}</Link>
                      {hasSubmenu && (
                        <ChevronDown
                          className={`${
                            isSubmenuOpen ? "rotate-180" : ""
                          } transition-transform`}
                          size={18}
                        />
                      )}
                    </span>
                  </Button>

                  {/* Mobile submenu */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div className="flex flex-col ml-4 mt-1">
                      {link.submenu!.map((subLink) => (
                        <Button
                          key={subLink.label}
                          className={`rounded-full font-medium w-full my-1 ${
                            active === subLink.label
                              ? "bg-[#F4781B] text-white"
                              : "bg-transparent text-gray-700 hover:bg-[#F4781B]-100"
                          }`}
                          variant="ghost"
                          asChild
                          onClick={() => {
                            setActive(subLink.label);
                            setMobileOpen(false);
                            setOpenSubmenu(null);
                          }}
                        >
                          <Link href={subLink.href}>{subLink.label}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full max-w-sm py-4 px-4 flex flex-col gap-2">
            <CustomButton className="w-full justify-center my-1" rightIcon={Download}>
              Download App
            </CustomButton>
            <CustomButton className="w-full justify-center my-1" variant="secondary">
              Find Jobs & Login
            </CustomButton>
          </div>
        </div>
      )}
    </header>
    {children}
    </div>
  );
}
