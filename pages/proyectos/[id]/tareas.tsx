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
            <h1 className="ml-16 text-4xl/5 font-bold decoration-gray-400">Listado de tareas</h1>
          </div>
          
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <div className="sm:flex sm:flex-row-reverse mr-16 ml-16 justify-between">
          <ButtonActionTask style={' bg-blue-400 hover:bg-blue-600 '} title="Crear tarea" projectId={projectId} actionType="createTask" taskId=''/>
          <button  type="button" onClick={backPage} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                     Volver (no funciona)</button>


          </div>
          <div className="flex flex-col mt-1 ">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-[90%] ml-16 overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                        <HeaderItem title="Nombre" />
                        <HeaderItem title="Estado" />
                        <HeaderItem title="ID" />
                    </tr>
                  </thead>
                  <tbody>
                  {loading ? <Loading /> : 
                        list.length === 0 ? (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                No hay proyectos creados.
                            </td>
                        </tr>
                            ) :
                    list.map((task) => (
                      <TaskGridRow key={task['id']} task={task} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> 
          </>
          }
        </div>
      </div>
    )
}

