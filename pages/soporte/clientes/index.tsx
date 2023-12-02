import ClienteGridRow from "@/components/clientesGridRow";
import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import ResponsableGridRow from "@/components/responsableGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useEffect, useState } from "react";

export default function Clientes() {
  const [loading, setLoading] = useState(true)
  const [clientes, setClientes] = useState([])

  useEffect(() => {
      fetch(`https://psa-support-management.onrender.com/customers/externalApiCustomers`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setClientes(res)
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
              <h1 className="text-3xl font-bold text-black decoration-gray-400">Clientes</h1>
          </div>
          <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                      <table className="min-w-full">
                          <thead>
                          <tr>
                              <HeaderItem title="Id" />
                              <HeaderItem title="Razón Social" />
                              <HeaderItem title="CUIT" />
                          </tr>
                          </thead>

                          <tbody>
                          {clientes.map((cliente) => (
                              <ClienteGridRow key={cliente['id']} cliente={cliente} />
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
