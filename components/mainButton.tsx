import React from 'react';
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {
  href: string;
  title: string;
};

export const MainButton = ( { href, title }: Props) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <div
        className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-red-400 hover:bg-amber-100 dark:text-white dark:hover:bg-amber-700`}
      >
        <span className={`flex-1 ml-2 text-left whitespace-nowrap ${router.asPath === href && "font-bold"}`}>
          {title}
        </span>
      </div>
    </Link>
  )
}
