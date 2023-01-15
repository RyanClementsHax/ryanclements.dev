import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Popover, Transition } from "@headlessui/react";

import { Fragment } from "react";
import Link from "next/link";

interface NavItem {
  href: string;
  name: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", name: "Home" },
  { href: "/posts", name: "Posts" },
];

export default function Header(): JSX.Element {
  return (
    <header>
      <Popover>
        <ThisDoesntWork items={NAV_ITEMS} />
      </Popover>
      <Popover>
        <ThisWorks items={NAV_ITEMS} />
      </Popover>
    </header>
  );
}

const ThisDoesntWork: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <div>
    <Popover.Button className="inline-flex items-center rounded-md border border-gray-500 px-3 py-2 text-sm text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
      This doesnt work
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    </Popover.Button>
    <Transition.Root>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="fixed inset-x-4 top-8 z-50 origin-top rounded-xl bg-white p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Navigation</h2>
            <Popover.Button aria-label="Close menu" className="-m-1 p-1">
              <XMarkIcon className="h-6 w-6" />
            </Popover.Button>
          </div>
          <nav className="my-2">
            <ul className="divide-y divide-gray-500/50">
              {items.map((x) => (
                <MobileNavItem key={x.href} item={x} />
              ))}
            </ul>
          </nav>
        </Popover.Panel>
      </Transition.Child>
    </Transition.Root>
  </div>
);

const ThisWorks: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <div>
    <Popover.Button className="inline-flex items-center rounded-md border border-gray-500 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
      This works
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    </Popover.Button>
    <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
    <Popover.Panel
      focus
      className="fixed inset-x-4 top-8 z-50 origin-top rounded-xl bg-white p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Navigation</h2>
        <Popover.Button aria-label="Close menu" className="-m-1 p-1">
          <XMarkIcon className="h-6 w-6" />
        </Popover.Button>
      </div>
      <nav className="my-2">
        <ul className="divide-y divide-gray-500/50">
          {items.map((x) => (
            <MobileNavItem key={x.href} item={x} />
          ))}
        </ul>
      </nav>
    </Popover.Panel>
  </div>
);

const MobileNavItem: React.FC<{ item: NavItem }> = ({
  item: { href, name },
}) => (
  <li>
    <Popover.Button
      as={Link}
      href={href}
      className="block py-4 text-base transition"
    >
      {name}
    </Popover.Button>
  </li>
);
