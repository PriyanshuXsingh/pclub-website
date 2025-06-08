"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { IconBrandDiscord } from "@tabler/icons-react";

export const FooterSection = () => {
  return (
    <footer className="bg-[#2c2e48] text-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold">Personal</h2>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-sm tracking-widest text-[#FF6A5C] font-medium mb-4">
              MENU
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#domains"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm tracking-widest text-[#FF6A5C] font-medium mb-4">
              SERVICE
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  See More
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex items-start justify-start gap-4 md:col-span-1 lg:justify-end">
            <Link
              href="https://discord.gg/sHmYD63J"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF6A5C] text-white hover:opacity-90"
            >
              <IconBrandDiscord className="w-4 h-4" />
            </Link>
            <Link
              href="https://x.com/PClubUIET?t=1K6tLLIc9XLwOXmJARKWag&s=08"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF6A5C] text-white hover:opacity-90"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.instagram.com/pclubuiet?utm_source=qr&igsh=MWE4NnFjbGMwenVwMQ=="
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF6A5C] text-white hover:opacity-90"
            >
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Separator and Bottom Text */}
        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60 gap-4">
          <span>Copyright © 2022 Laaqiq. All Rights Reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
