import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonActionTask } from "@/components/tareas/buttonActionTask";
import { Status } from "@/types/types";
import { ViewTask } from "@/components/tareas/buttonViewTask";

export default function Tarea() {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])
  const router = useRouter();
  const { id } = router.query;


  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setupData() {

    let description = document.getElementById("description")
    let status = document.getElementById("status")
    let creationDate = document.getElementById("creationDate")
    let assignedTo = document.getElementById("assignedTo")
    let projectId = document.getElementById("projectId")

     // @ts-ignore
    let creationDateArray: string[] = (task['creationDate']).split('T');
    // @ts-ignore
     description.innerText = `${task['description']}`
    // @ts-ignore
    status.innerText = `${Status[task ['status']]}`
    // @ts-ignore
    creationDate.innerText = `${(creationDateArray[0]).split('-').reverse().join("/")}`
    // @ts-ignore
    assignedTo.innerText = `${task['assignedTo']}`
    // @ts-ignore
    projectId.innerText = `${task['projectId']}`

  }

  useEffect(() => {
    if (id) {
      fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/task/${id}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setTask(res)
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
    
    <div className="container max-w-2xl flex flex-col	mx-auto ">
      {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    <>
    
        {/* puede ser esto lo que lo haga tan grande */}
     <div className="conteiner mt-3 border-4 border-gray-500 w-full flex flex-col" >
     
       <h1 className="text-5xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>{id}</h1>
        
       <div className="ml-10 flex flex-row mt-5">
          <h2 className="font-bold" style={{fontSize: '1.3rem'}}>Id de proyecto asociado:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="projectId"></div>
        </div>

        <div className="ml-10 mt-5 flex flex-row">
          <h2 className="font-bold" style={{fontSize: '1.3rem'}}>Fecha de inicio:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="creationDate"></div>
        </div>

        <div className="ml-10 flex flex-row mt-5">
          <h2 className="font-bold" style={{fontSize: '1.3rem'}}>Estado de la tarea:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="status"></div>
        </div>

        <div className="ml-10 flex flex-row mt-5">
          <h2 className="font-bold" style={{fontSize: '1.3rem'}}>Responsable a cargo:</h2>
          <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="assignedTo"></div>
        </div>
       
        <div className="ml-10 mt-5">
          <h2 className="font-bold" style={{fontSize: '1.3rem'}}>Descripción:</h2>
          <div className="shadow-sm p-1 block sm:text-sm border border-gray-500 rounded-md text-gray-900" style={{width:400, height:100}}>
            <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="description"></div>
          </div>
        </div>
        <ViewTask title="VOLVER A LISTADO DE TAREAS" href= {
        // @ts-ignore 
       `/proyectos/${task['projectId']}/tareas`}/> 
    </div> 
          
    <div className="mt-1 flex flex-row  justify-between">
        <div>
        <ButtonActionTask style={' bg-red-400 hover:bg-red-600 '} title="Borrar" taskId={id} actionType="deleteTask" projectId={
              // @ts-ignore 
              task['projectId']} />
        </div>
        <div className="">
        <ButtonActionTask style={' bg-blue-200 hover:bg-blue-600 '} title="Modificar" taskId={id} actionType="modifyTask" projectId={
              // @ts-ignore 
              task['projectId']} />
        </div>
      </div>

    </>
    }
       
    </div>
   </div>
  )
}