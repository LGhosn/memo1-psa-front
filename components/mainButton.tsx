import React from 'react';
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {
  href: string;
  title: string;
};

export const MainButton = ( { href, title}: Props) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <div className={`flex items-center p-2 transition duration-75 rounded-lg bg-blue-400 hover:bg-amber-100 dark:text-white dark:hover:bg-blue-700`}>
        <span className={`flex-1 ml-2 whitespace-nowrap text-center ${router.asPath === href && "font-bold"}`}>
          {title}
        </span>
      </div>
    </Link>
  )
}
