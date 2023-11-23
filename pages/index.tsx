import { MainButton } from "@/components/mainButton"
import { MainContainer } from "@/components/mainContainer"
import { mainRoutes } from "@/utils/routes"


export default function Home() {
  return (
    <MainContainer title="Módulos">
      <div className="flex space-x-5 mt-10 items-center bg-white">
        {mainRoutes.map((item) => (
          <MainButton {...item} key={item.title} />
        ))}
      </div>
    </MainContainer>
  )
}
