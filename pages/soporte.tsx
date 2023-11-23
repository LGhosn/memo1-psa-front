import ProjectGridRow from "@/components/projectGridRow";
import { MainButton } from "@/components/mainButton";
import { MainContainer } from "@/components/mainContainer";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Soporte() {
  const supportItems = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "soporte/productos",
      title: "Productos",
    },
    {
      href: "soporte/tareas",
      title: "Tareas",
    },
  ]

  return (
    <MainContainer title="Soporte">
      <div className="flex space-x-5 mt-10 items-center bg-white">
        {supportItems.map((item) => (
          <MainButton {...item} key={item.title} />
          ))}
      </div>
    </MainContainer>  
  )
}
