"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";

interface RouteProps {
  href: string;
  label: string;
}

interface DomainProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "#about",
    label: "About Us",
  },
  {
    href: "#team",
    label: "The Team",
  },
  {
    href: "#sessions",
    label: "Upcoming Sessions",
  },
];

const domainList: DomainProps[] = [
  {
    title: "Web Development",
    description: "Frontend and Backend technologies, frameworks, and tools.",
  },
  {
    title: "Mobile Development",
    description: "iOS and Android app development with modern frameworks.",
  },
  {
    title: "Data Science & AI",
    description:
      "Machine Learning, Data Analysis, and Artificial Intelligence.",
  },
  {
    title: "Competitive Programming",
    description: "Algorithm design, problem solving, and coding competitions.",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-[#2c2f4a] w-full top-0 sticky z-40 border-b border-[#3a3f5f]">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg flex items-center text-white"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <span className="text-[#2c2f4a] font-bold text-sm">PC</span>
          </div>
          Club
        </Link>

        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer text-white hover:text-gray-300"
              />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex flex-col justify-between bg-[#2c2f4a] border-[#3a3f5f] text-white"
            >
              <div>
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center text-white">
                    <Link href="/" className="flex items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                        <span className="text-[#2c2f4a] font-bold text-sm">
                          PC
                        </span>
                      </div>
                      Club
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base text-white hover:text-[#9d4edd] hover:bg-[#3a3f5f]"
                  >
                    <Link href="#domains">Our Domains</Link>
                  </Button>

                  {routeList.map(({ href, label }) => (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base text-white hover:text-[#9d4edd] hover:bg-[#3a3f5f]"
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                <Separator className="mb-4 bg-[#3a3f5f]" />
                <Button
                  className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACT
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:block mx-auto">
          <NavigationMenuList>
            {/* Our Domains Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white text-base border-none">
                Our Domains
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] grid-cols-1 gap-3 p-4 bg-white">
                  {domainList.map(({ title, description }) => (
                    <NavigationMenuLink key={title} asChild>
                      <Link
                        href={`#${title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block rounded-md p-3 text-sm hover:bg-gray-50 transition-colors"
                      >
                        <p className="mb-1 font-semibold leading-none text-[#2c2f4a]">
                          {title}
                        </p>
                        <p className="line-clamp-2 text-gray-600">
                          {description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Regular Navigation Links */}
            <NavigationMenuItem>
              {routeList.map(({ href, label }) => (
                <NavigationMenuLink key={href} asChild>
                  <Link
                    href={href}
                    className="text-base px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Contact Button */}
        <div className="hidden lg:flex">
          <Button
            asChild
            className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-medium px-6 py-2 transition-all duration-200 transform hover:scale-105"
          >
            <Link href="#contact">CONTACT</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
