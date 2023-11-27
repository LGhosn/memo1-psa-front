import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonDeleteProject } from "@/components/proyectos/buttonDeleteProject";

export default function Tarea() {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState([])
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setupData() {
    let name = document.getElementById("name")
    let description = document.getElementById("description")
    let status = document.getElementById("status")
    let creationDate = document.getElementById("creationDate")
    let assignedTo = document.getElementById("assignedTo")

    console.log(task)
    // @ts-ignore
    name.innerText = `Tarea ${task['name']}`
    // @ts-ignore
    description.innerText = `Descripción:${task['description']}`
    // @ts-ignore
    status.innerText = `Estado:${task['status']}`
    // @ts-ignore
    creationDate.innerText = `Fecha de inicio:${task['creationDate']}`
    // @ts-ignore
    assignedTo.innerText = `Responsable a cargo:${task['assignedTo']}`
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
    
    <div className="container max-w-4xl	mx-auto mt-8">
      {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    
     <div className="border-4 border-blue-500" style={{ width: 900, height: 500, marginTop:"20px" }}>
       <h1 className="text-4xl mb-5 font-bold" id="name" style={{textAlign:'center', marginTop:"20px"}}></h1>
        <div className="flex items-center text-gray-900" id="description"></div>
        <div className="flex items-center text-gray-900" id="status"></div>
        <div className="flex items-center text-gray-900" id="creationDate"></div>
        <div className="flex items-center text-gray-900" id="assignedTo"></div>
        <h1>
          
        </h1>
       <div className='flex justify-center'>
       </div>
       
    </div>
    }
    </div>
   </div>
  )
}