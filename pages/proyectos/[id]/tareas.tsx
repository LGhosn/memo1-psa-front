import HeaderItem from "@/components/headerItem";
import TaskGridRow from "@/components/tareas/taskGridRow";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useRouter } from 'next/router';
import { ButtonActionTask } from "@/components/tareas/buttonActionTask";
import TaskTable from "@/components/tareas/taskTable";

export default function Tareas() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const projectId = router?.query?.id as string;
  function backPage(){
    router.push(`/proyectos/${projectId}`)
   
  }
  useEffect(() => {
    if (router.isReady) {
      fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/project/${projectId}`)
        .then((res) => {
          return res.json()
        }).then((res) => {
          setList(res)
          setLoading(false)
        })
   }
  }, [router.isReady])

    return (

      <div className="flex flex-row" >
        <SideBar items={projectSideBarItems}></SideBar>
        <div className="container w-full  mx-auto mt-8 flex flex-col">
          <div className="mb-4">
            <h1 className="text-5xl font-bold decoration-gray-400">Listado de tareas</h1>
          </div>
          
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <TaskTable projectId={projectId} list={list} />

         
          </>
          }
        </div>
      </div>
    )
}

