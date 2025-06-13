"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { IconBrandDiscord } from "@tabler/icons-react"

export const FooterSection = () => {
  return (
    <footer className="bg-[#2c2e48] py-16 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold">Personal</h2>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-sm font-medium tracking-widest text-[#FF6A5C]">
              MENU
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#domains"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-medium tracking-widest text-[#FF6A5C]">
              SERVICE
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-white hover:underline"
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6A5C] text-white hover:opacity-90"
            >
              <IconBrandDiscord className="h-4 w-4" />
            </Link>
            <Link
              href="https://x.com/PClubUIET?t=1K6tLLIc9XLwOXmJARKWag&s=08"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6A5C] text-white hover:opacity-90"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.instagram.com/pclubuiet?utm_source=qr&igsh=MWE4NnFjbGMwenVwMQ=="
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6A5C] text-white hover:opacity-90"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Separator and Bottom Text */}
        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
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
  )
}
