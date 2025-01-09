"use client";

import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  const navItem = [
    { label: "Main", href: ROUTES.HOME },
    { label: "Users", href: ROUTES.USERS },
    { label: "Analytics", href: ROUTES.ANALYTICS },
  ];

  return (
    <div className=" h-full p-5 ">
      <h1 className="text-xl font-bold text-grey-500">
        <Link href={ROUTES.HOME}>{"Home App"}</Link>
      </h1>
      <nav>
        <ul className="mt-10">
          {navItem.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-lg ${
                  pathName === item.href
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
