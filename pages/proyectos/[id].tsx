import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonActionProject } from "@/components/proyectos/buttonActionProject";
import { ViewTask } from "@/components/tareas/buttonViewTask";

export default function Proyecto () {
  const [loading, setLoading] = useState(true)
  const [proyecto, setProyecto] = useState([])
  const router = useRouter();
  const { id } = router.query;
  function setupData() {
    let statusText = ''
    let description = document.getElementById("description")
    let status = document.getElementById("status")
    let creationDate = document.getElementById("creationDate")
    let totalHours = document.getElementById("totalHours")
    let leader = document.getElementById("leader")

    // @ts-ignore
    if (proyecto['status'] === "NOT_STARTED") {
      statusText = "INICIADO"
      // @ts-ignore
     } else if (proyecto['status'] === "IN_PROGRESS") {
      statusText = "EN PROGRESO"
      // @ts-ignore
     } else if (proyecto['status'] === "COMPLETED") {
      statusText = "COMPLETADO"
      // @ts-ignore
     } else if (proyecto['status'] === "BLOCKED") {
      statusText = "BLOQUEADO"
     }
     
     // @ts-ignore
     let creationDateArray: string[] = (proyecto['creationDate']).split('T');
    
    // @ts-ignore
     description.innerText = `${proyecto['description']}`
    // @ts-ignore
    status.innerText = `${statusText}`
    // @ts-ignore
    creationDate.innerText = `${(creationDateArray[0]).split('-').reverse().join("/")}`
    // @ts-ignore
    totalHours.innerText = `${proyecto['totalHours']}`
    // @ts-ignore
    leader.innerText = `${proyecto['leader']}`
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
    }, [loading])

    

  return (
    <div className="flex flex-row">
    <SideBar items={projectSideBarItems}></SideBar>
    
    <div className="container max-w-4xl	mx-auto mt-8">
      {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    <>
    
     <div className="container max-w-8xl mx-auto mt-8 space-y-50 border-4 border-gray-500" >
       <h1 className="text-5xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>Proyecto {id}</h1>
        <div className="ml-10 mt-3 flex flex-row">
          <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Fecha de inicio:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="creationDate"></div>
        </div>
        <div className="ml-10 flex flex-row mt-3">
          <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Horas estimadas:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="totalHours"></div>
          <div className=" mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}}>hrs</div>
        </div>

        <div className="ml-10 flex flex-row mt-3">
          <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Estado del proyecto:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="status"></div>
        </div>

        <div className="ml-10 flex flex-row mt-3">
          <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Líder del proyecto:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="leader"></div>
        </div>
       
        <div className="ml-10 mt-10">
          <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Descripción:</h2>
          <div className="border border-black rounded-2xl" style={{width:400, height:100}}>
            <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="description"></div>
          </div>
        </div>
        <ViewTask href= {
        // @ts-ignore 
       `/proyectos/${proyecto['id']}/tareas`}/> 
    </div> 

    <div className="mt-1 flex flex-row space justify-between">
        <div>
          <ButtonActionProject title="Borrar" id={
          // @ts-ignore
          proyecto['id']} actionType="deleteProject" style={' bg-red-400 hover:bg-red-600 '}/>
        </div>
        <div className="">
          <ButtonActionProject title="Modificar" id={
          // @ts-ignore
          proyecto['id']} actionType="modifyProject" style={' bg-blue-200 hover:bg-blue-600 '}/>
        </div>
      </div>

    </>
    }
    
     
       
    </div>
   </div>
  )
}