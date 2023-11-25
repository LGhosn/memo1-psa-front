import { MainButton } from "@/components/mainButton";
import { MainContainer } from "@/components/mainContainer";
import { supportRoutes } from "@/utils/routes";

export default function Soporte() {

  return (
    <MainContainer title="Soporte">
      <div className="flex space-x-5 mt-10 items-center bg-white">
        {supportRoutes.map((item) => (
          <MainButton {...item} key={item.title} height = "50px" width = "150px" fontSize='1.2rem' />
          ))}
      </div>
    </MainContainer>  
  )
}
