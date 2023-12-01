import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import TaskGridRow from "@/components/tareas/taskGridRow";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";

export default function TareasTicket() {
  const [loadingAsignadas, setLoadingAsignadas] = useState(false)
  const [tareasAsignadas, setTareasAsignadas] = useState([])
  const [tareasSinAsignar, setTareasSinAsignar] = useState([])
  const router = useRouter()
  const { ticketId, ticketName } =  router.query;


  useEffect(() => {
    if (ticketId) {
      fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/ticket/${ticketId}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setTareasAsignadas(res)
        setLoadingAsignadas(false)
      })
    }
  }, [ticketId])

  return (
  <div className="flex flex-row">
  <SideBar items={supportSideBarItems}></SideBar>
  <div className="container max-w-2xl mx-auto mt-8">
    {loadingAsignadas ? <Loading /> : <>
    <span className="text-2xl mb-5 font-bold text-black text-left" id="title" >Tareas Asginadas al ticket: <strong>#{ticketId} - {ticketName} </strong></span>
    <div className="flex flex-col pt-2">
    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
                <HeaderItem title="ID" />
                <HeaderItem title="Nombre" />
                <HeaderItem title="" />
            </tr>
          </thead>
          <tbody>
            {tareasAsignadas.map((tarea) => (
              <TaskGridRow key={tarea['id']} task={tarea} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    {/* <div className="flex flex-col">

    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
                <HeaderItem title="ID" />
                <HeaderItem title="Nombre" />
                <HeaderItem title="Estado" />
                
            </tr>
          </thead>
          <tbody>
                {tareasAsignadas.length === 0 ? (
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        No hay tareas asignadas.
                    </td>
                </tr>
                    ) :
                    tareasAsignadas.map((task) => (
              <TaskGridRow key={task['id']} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
      <h1 className="text-4xl mb-5 font-bold text-black text-left pt-10" id="title" >Tareas no Asginadas al ticket {ticketId}</h1>
      <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
                <HeaderItem title="ID" />
                <HeaderItem title="Nombre" />
                <HeaderItem title="Estado" />
                
            </tr>
          </thead>
          <tbody>
          {loadingAsignadas ? <Loading /> : 
                tareasAsignadas.length === 0 ? (
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        No hay tareas asignadas.
                    </td>
                </tr>
                    ) :
                    tareasAsignadas.map((task) => (
              <TaskGridRow key={task['id']} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div> */}
    </>
  }
  </div>
  </div>
  )
}