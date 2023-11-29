import React from 'react';
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {
  href: string;
 
};

export const ViewTask = ( { href}: Props) => {
  const router = useRouter()

  return (
    <Link href={href}>
        <div className={`mt-10 flex items-center p-2 transition duration-75 rounded-sm bg-gray-200 hover:bg-gray-400 dark:text-white dark:hover:bg-blue-700`}>
            <span className={`flex-1 text-lg whitespace-nowrap text-center font-bold ${router.asPath === href}`}>
                VER TAREAS
            </span>
        </div>
    </Link>
  )
}
