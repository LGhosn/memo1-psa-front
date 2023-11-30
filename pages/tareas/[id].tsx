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


  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setupData() {

    let description = document.getElementById("description")
    let status = document.getElementById("status")
    let creationDate = document.getElementById("creationDate")
    let assignedTo = document.getElementById("assignedTo")

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
      <div className="container flex flex-col max-w-7xl mx-10 space-y-50">
        {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>: <>
            <div className="container space-y-50 border-4 mt-8 mx-auto border-gray-500" style={{height: "83%"}}>
              <h1 className="text-5xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>Tarea {id}</h1>
                <div className="ml-10 mt-3 flex flex-row">
                <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Descripción:</h2>
                <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="description"></div>
              </div>
            
              <div className="ml-10 flex flex-row mt-3">
                <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Estado:</h2>
                <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="status"></div>
              </div>

              <div className="ml-10 flex flex-row mt-3">
                <h2 className="font-bold" style={{fontSize: '1.4rem'}}>Fecha de creación:</h2>
                <div className="ml-2 mt-1 flex items-center text-gray-900" style={{fontSize: '1.2rem'}} id="creationDate"></div>
              </div>
              
              <div className="ml-10 flex flex-row mt-3">
                <h2 className="font-bold mb-10" style={{fontSize: '1.4rem'}}>Responsable a cargo:</h2>
                <div className="ml-2 mt-1 flex items-center text-gray-900 mb-10" style={{fontSize: '1.2rem'}} id="assignedTo"></div>
              </div>              
            </div>
            <div className="mt-1 flex flex-row space justify-between content-end">
              <ButtonActionTask style={' bg-red-400 hover:bg-red-600 '} title="Borrar" taskId={id} actionType="deleteTask" projectId={
              // @ts-ignore 
              task['projectId']} />
              <ButtonActionTask style={' bg-blue-200 hover:bg-blue-600 '} title="Modificar" taskId={id} actionType="modifyTask" projectId={
              // @ts-ignore 
              task['projectId']} />
            </div>
          </>
        }
      </div> 
    </div>
  )
}