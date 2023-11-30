import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonActionTask } from "@/components/tareas/buttonActionTask";
import { Status } from "@/types/types";

export default function Tarea() {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])
  const router = useRouter();
  const { id } = router.query;
  function backPage(){
    // @ts-ignore
    router.push(`/proyectos/${task['projectId']}/tareas`)
  }

  
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
    
    <div className="container max-w-xl flex flex-col	mx-auto ">
      {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    <>
    
        {/* puede ser esto lo que lo haga tan grande */}
     <div className="flex flex-col border-4 border-gray-500 w-full h-11/12 mt-5" >
     
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
       
        <div className="ml-10 mb-5 mt-5">
          <h2 className="font-bold" style={{fontSize: '1.3rem'}}>Descripción:</h2>
          <div className="shadow-sm p-1 block sm:text-sm border border-gray-500 rounded-md text-gray-900" style={{width:400, height:100}}>
            <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="description"></div>
          </div>
        </div>
    </div> 
          
    <div className="mt-1 flex flex-row  justify-between">
        <div className="ml-10">
        <ButtonActionTask style={' bg-red-400 hover:bg-red-600 '} title="Borrar" taskId={id} actionType="deleteTask" projectId={
              // @ts-ignore 
              task['projectId']} />
        </div>
        <div className="">
        <ButtonActionTask style={' bg-blue-200 hover:bg-blue-600 '} title="Modificar" taskId={id} actionType="modifyTask" projectId={
              // @ts-ignore 
              task['projectId']} />
        </div>
        <div>
        <button  type="button" onClick={backPage} className="flex flex-row text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
            <div className="text-base">Volver</div>
          </button>
        </div>
      </div>

    </>
    }
       
    </div>
   </div>
  )
}