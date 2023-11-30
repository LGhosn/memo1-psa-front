import React from 'react';
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {
  href: string;
  title: string;
  styleButton?: any;
  styleText?: any;
};

export const MainButton = ( { href, title, styleButton, styleText}: Props) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <div style={styleButton} className={`flex items-center m-2 p-2 transition duration-75 rounded-lg bg-blue-400 hover:bg-blue-600 dark:text-white dark:hover:bg-blue-700`}>
        <span style={styleText} className={`flex-1 ml-2 whitespace-nowrap text-center font-bold ${router.asPath === href}`}>
          {title}
        </span>
      </div>
    </Link>
  )
}
