import HeaderItem from "@/components/headerItem";
import TaskGridRow from "@/components/tareas/taskGridRow";
import { SideBar } from "@/components/sideBar";
import { projectSideBarItems } from "@/utils/routes";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useRouter } from 'next/router';
import { ButtonActionTask } from "@/components/tareas/buttonActionTask";


export default function Tareas() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const projectId = router?.query?.id as string;
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

      <div className="flex flex-row">
        <SideBar items={projectSideBarItems}></SideBar>
        <div className="container max-w-7xl mx-auto mt-8 space-y-50">
          <div className="mb-4">
            <h1 className="text-3xl font-bold decoration-black">Tareas</h1>
          </div>
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <HeaderItem title="Nombre" />
                      <HeaderItem title="Estado" />
                      <HeaderItem title="" />
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <Loading /> : 
                        //verifico si la lista está vacía
                        list.length === 0 ? (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                No hay tareas creadas para este proyecto
                            </td>
                        </tr>
                            ) :
                    list.map((tarea) => (
                        
                        <TaskGridRow key={tarea['id']} task={tarea} />
                    ))}
                    </tbody>
                  
                </table>
              </div>
            </div>
          </div>
          <ButtonActionTask title="Crear tarea" projectId={projectId} actionType="createTask" taskId=''/>
          </>
          }
        </div>
      </div>
    )
}

