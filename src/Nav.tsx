import { Outlet, NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu.tsx";
import React from "react";
import { cn } from "./lib/utils.ts";

export default function Layout() {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <nav className="border-b-2 border-cyan-900 flex justify-center py-2 px-6">
        <div className="flex justify-between items-center max-w-2xl w-full">
          <NavLink to="/">
            <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              Affluent
            </span>
          </NavLink>
          <NavMenu />
        </div>
      </nav>
      <div className="flex-grow">
        <div className="flex flex-col justify-center items-center p-4 h-full">
          <main className="flex flex-col max-w-2xl w-full">
            <Outlet />
          </main>
        </div>
      </div>
      <footer className="border-t-2 border-cyan-900 flex justify-center py-2">
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4">
            <a href="https://github.com/nathanaelrea/affluent">
              <GithubIcon />
            </a>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            For informational purposes only. Data is only stored locally.
          </span>
        </div>
      </footer>
    </div>
  );
}

type Component = {
  title: string;
  href: string;
  description: string;
};
const components: Component[] = [
  {
    title: "Cost of Living",
    href: "/cost-of-living",
    description:
      "Calculate the cost of living change with tax and itemized expenses.",
  },
  {
    title: "Monete Carlo SWR",
    href: "/monte-carlo-swr",
    description: "Simulate a portfolio with custom funds and withdraw rate.",
  },
];

function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
          to={props.href!}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
});

function GithubIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
