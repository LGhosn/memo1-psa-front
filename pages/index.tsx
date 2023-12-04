import { MainButton } from "@/components/mainButton"
import { MainContainer } from "@/components/mainContainer"
import { mainRoutes } from "@/utils/routes"


export default function Home() {
  return (
    <MainContainer title="Módulos">
      <div className="flex space-x-16 mt-10 items-center bg-zinc-200 ">
        {mainRoutes.map((item) => (
          <MainButton {...item} key={item.title} styleButton={{
            height: '90px',
            width: '200px',
          }} 
          styleText={{textAlign: "center",
          fontSize:'1.875rem',
          fontWeight:'600',
          lineHeight: '2.75rem'}}/>
        ))} 
      </div>

    </MainContainer>
  )
}
