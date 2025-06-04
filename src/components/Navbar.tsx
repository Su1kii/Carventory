import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Car, CirclePlus, HomeIcon, LogIn, LogOut } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              🚘 Carventory
            </Link>
          </div>

          {/* Navbar component */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/create">
                <CirclePlus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/cars">
                <Car className="w-4 h-4" />
                <span className="hidden sm:inline">Cars</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />

            {!user ? (
              <>
                {/* Sign in Button */}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {/* Sign Out Button */}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Link>
                </Button>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
