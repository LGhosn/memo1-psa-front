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
          <button  type="button" onClick={backPage} className="flex flex-row text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg>
            <div className="text-base">Volver</div>
          </button>
                     

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
                                No hay tareas creadas.
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

