import React from 'react';
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {
  href: string;
  title: string;
  height: string;
  width: string;
  fontSize: string;
};

export const MainButton = ( { href, title,height,width,fontSize}: Props) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <div

        className={`flex items-center w-full p-2 transition duration-75 rounded-lg group bg-blue-400 hover:bg-amber-100 dark:text-white dark:hover:bg-blue-700`}

      >
      
        <span className={`flex-1 ml-2 text-left whitespace-nowrap ${router.asPath === href && "font-bold"}`}
         style={{
          fontSize,
          textAlign: "center"
       }}>
          {title}
        </span>
      </div>
    </Link>
  )
}
