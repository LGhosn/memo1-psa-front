import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import ResponsableGridRow from "@/components/responsableGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useEffect, useState } from "react";

export default function Responsables() {
  const [loading, setLoading] = useState(true)
  const [responsables, setResponsables] = useState([])

  useEffect(() => {
      fetch(`https://psa-support-management.onrender.com/employees/`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setResponsables(res)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-row">
      <SideBar items={supportSideBarItems}></SideBar>
      <div className="container max-w-7xl mx-auto mt-8">
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
          <>
          <div className="mb-4">
              <h1 className="text-3xl font-bold text-black decoration-gray-400">Responsables</h1>
          </div>
          <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                      <table className="min-w-full">
                          <thead>
                          <tr>
                              <HeaderItem title="Id" />
                              <HeaderItem title="Legajo" />
                              <HeaderItem title="Nombre" />
                              <HeaderItem title="Apellido" />
                          </tr>
                          </thead>

                          <tbody>
                          {responsables.map((responsable) => (
                              <ResponsableGridRow key={responsable['id']} responsable={responsable} />
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
