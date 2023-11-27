import HeaderItem from "@/components/headerItem";
import TaskGridRow from "@/components/ticketGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { Button } from "@/components/button";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import {ButtonForCreation} from "@/pages/soporte/ButtonForCreation";

export default function Tickets() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://psa-support-management.onrender.com/tickets/")
    .then((res) => {
      return res.json()
    }).then((res) => {
          setList(res)
          setLoading(false)
        })
  }, [])

    return (

      <div className="flex flex-row">
        <SideBar items={supportSideBarItems}></SideBar>
        <div className="container max-w-7xl mx-auto mt-8 space-y-50">
          <div className="mb-4">
            <h1 className="text-3xl font-bold decoration-black">Tickets</h1>
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
                      <HeaderItem title="Titulo" />
                      <HeaderItem title="Severidad" />
                      <HeaderItem title="Prioridad" />
                      <HeaderItem title="Estado" />
                      <HeaderItem title="Tipo" />
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((tarea) => (
                      <TaskGridRow key={tarea['id']} task={tarea} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div><ButtonForCreation title="Crear ticket" />
          </>
          }
        </div>
      </div>
    )
}

