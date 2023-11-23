import Image from "next/image"
import { Inter } from "next/font/google"
import { MainButton } from "@/components/mainButton"
import { Button } from "@/components/button"
import { MainContainer } from "@/components/mainContainer"

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
    <MainContainer title="Módulos">
      <div className="flex space-x-5 mt-10 items-center bg-white">
        {menuItems.map((item) => (
          <MainButton {...item} key={item.title} />
        ))}
      </div>
    </MainContainer>
  )
}
