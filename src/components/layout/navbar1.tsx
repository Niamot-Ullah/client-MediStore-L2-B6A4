"use client";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import logo1 from "@/public/logo1.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

import { User } from "@/types";

import LogoutButton from "../modules/authentication/LogoutButton";


interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  user?: User
}



const Navbar1 = ({
  logo = {
    url: "/",
    src: "./logo1.png",
    alt: 'medi store',
    title: "Shadcn",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/shop"
    },

    {
      title: "Blogs",
      url: "/blogs",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  user,
  className,
}: Navbar1Props) => {
  // console.log(user?.name);
  return (
    //logo
    <section className={cn("py-4", className)}>
      <div className=" w-11/12 mx-auto">

        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center">
              <img src={logo.src} alt={logo.alt} className="h-8 w-auto dark:invert" />
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <ModeToggle />
                  <Link href="/profile" className="relative h-9 w-9 overflow-hidden rounded-full border">
                    <img
                      src={user?.image ?? "/avatar-placeholder.png"}
                      alt={user?.name ?? "User"}
                      className="object-cover"
                    />
                  </Link>
                  <LogoutButton
                    variant="default"
                    size="sm"
                    className="hover:cursor-pointer"
                  >
                    Sign out
                  </LogoutButton>


                </>
              ) : (
                <>
                  <ModeToggle />
                  <Button asChild variant="outline" size="sm">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </>
              )}
            </div>


          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">


                    {user ? (
                      <>
                        <div className="flex justify-evenly">
                          <ModeToggle />
                          <Link href="/profile" className="relative h-9 w-9 overflow-hidden rounded-full border">
                            <img
                              src={user?.image ?? "/avatar-placeholder.png"}
                              alt={user?.name ?? "User"}
                              className="object-cover"
                            />
                          </Link>
                        </div>
                        <div className="w-full text-center hover:cursor-pointer">
                        <LogoutButton
                          variant="default"
                          size="sm"
                          className="w-full"
                        >
                          Sign out
                        </LogoutButton>

                        </div>


                      </>
                    ) : (
                      <>
                        <ModeToggle />
                        <Button asChild variant="outline" size="sm">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    )}


                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </section>
  );
};

//middle item
//pc
const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
//mobile
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">

        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">

      {item.title}
    </Link>
  );
};


export { Navbar1 };
