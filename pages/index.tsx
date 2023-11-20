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
      <h1 className="text-4xl mb-5 font-bold bg-black">Módulos</h1>
      {menuItems.map((item) => (
        <MainButton {...item} key={item.title} />
      ))}

      <Button title="Nueva tarea" />
    </div>
  )
}
