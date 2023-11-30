import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"

export const SideBar = ({ items }: { items: ISidebarItem[] }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(router.pathname);
  useEffect(() => {
    setSelected(router.pathname);
  }, [router.pathname]);
  return (
    <div className="flex flex-col w-64 min-h-screen bg-blue-300 border-r">
      <nav>
        <ul>
          {items.map((item) => (
            <SideBarItem {...item} key={item.title} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

