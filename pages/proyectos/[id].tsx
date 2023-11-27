import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonDeleteProject } from "@/components/proyectos/buttonDeleteProject";
import { StateButton } from "@/components/stateButton";

export default function Proyecto () {
  const [loading, setLoading] = useState(true)
  const [proyecto, setProyecto] = useState([])
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setupData() {
    let description = document.getElementById("description")
    let status = document.getElementById("status")
    let creationDate = document.getElementById("creationDate")
    let totalHours = document.getElementById("totalHours")
    let leader = document.getElementById("leader")

    console.log(proyecto)
    // @ts-ignore
    description.innerText = `Descripción:${proyecto['description']}`
    // @ts-ignore
    status.innerText = `Estado:${proyecto['status']}`
    // @ts-ignore
    creationDate.innerText = `Fecha de inicio:${proyecto['creationDate']}`
    // @ts-ignore
    totalHours.innerText = `Horas estimadas:${proyecto['totalHours']}`
    // @ts-ignore
    leader.innerText = `Líder de proyecto:${proyecto['leader']}`
  }

  useEffect(() => {
    if (id) {
      fetch(`https://psa-project-managment.onrender.com/api/v1/projects/project/name/${id}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setProyecto(res)
        setLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if (!loading)
      setupData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <div className="flex flex-row">
    <SideBar items={projectSideBarItems}></SideBar>
    
    <div className="container max-w-4xl	mx-auto mt-8">
      {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    
     <div className="border-4 border-blue-500" style={{ width: 900, height: 500, marginTop:"20px" }}>
       <h1 className="text-4xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>Proyecto {id}</h1>
        <div className="flex items-center text-gray-900" id="description"></div>
        <div className="flex items-center text-gray-900" id="status"></div>
        <div className="flex items-center text-gray-900" id="creationDate"></div>
        <div className="flex items-center text-gray-900" id="totalHours"></div>
        <div className="flex items-center text-gray-900" id="leader"></div>
        <h1>
          
        </h1>
       <div className='flex justify-center'>
       </div>
       <MainButton href= {
        // @ts-ignore 
       `/proyectos/${proyecto['id']}/tareas`} title= "Ver Tareas"/>  
       <ButtonDeleteProject title="Borrar" projectId={// @ts-ignore
       proyecto['id']} />    
    </div> 
    }
    </div>
   </div>
  )
}