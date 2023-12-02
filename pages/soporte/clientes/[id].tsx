import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml } from "@/utils/utils";
import StandardTicketTable from "@/components/soporte/standardTicketTable";
import { ActionButton } from "@/components/actionButton";


export default function Cliente() {
  const [loading, setLoading] = useState(true)
  const [ticketsClientes, setTicketsClientes] = useState([])
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (ticketsClientes){
      // levanto del localStorage el nombre completo
      const nameCompleto = window.localStorage.getItem("cliente")
      // @ts-ignore
      setElementInnerHtml("cliente", nameCompleto)
    }
  }, [ticketsClientes])

  useEffect(() => {
    if (id) {
      console.log(id)
      fetch(`https://psa-support-management.onrender.com/customers/${id}/tickets`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setTicketsClientes(res)
      }).finally(() => setLoading(false))
    }
  }, [id])

  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    <div className="container max-w-7xl mx-auto mt-8 space-y-50">
    <div className="mb-4">
        <h1 className="text-2xl text-black font-bold decoration-black text-center" id="cliente"></h1>
      </div>
      <div className="mb-4">
        <h1 className="text-2xl text-black font-bold decoration-black">Tickets del cliente:</h1>
      </div>
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
      <>
      <StandardTicketTable list={ticketsClientes} />
      <div className="p-2">
        <ActionButton onClick={() => router.back()} title="Volver" style={"w-28"}/>
      </div>
      </>
      }
    </div>
  </div>
  )
}