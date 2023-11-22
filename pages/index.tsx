import Image from "next/image"
import { Inter } from "next/font/google"
import { MainButton } from "@/components/mainButton"
import { Button } from "@/components/button"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const menuItems = [
    {
      href: "/proyectos",
      title: "Proyectos",
    },
    {
      href: "/soporte",
      title: "Soporte",
    }
  ]

  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <h1 className="text-4xl mb-5 font-bold">Módulos</h1>
      <div style={{ display: "flex" ,flexDirection: "column", gap:'3rem'}}>
        {menuItems.map((item) => (
        <MainButton {...item} key={item.title}
        height = "90px"
        width = "200px"
        fontSize='1.5rem'/>
      ))}

      </div>

    </div>
  )
}
