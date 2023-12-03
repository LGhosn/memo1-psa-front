import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml } from "@/utils/utils";
import HeaderItem from "@/components/headerItem";
import TicketGridRow from "@/components/ticketGridRow";
import ButtonForCreation from "../ButtonForCreation";
import StandardTicketTable from "@/components/soporte/standardTicketTable";
import { ActionButton } from "@/components/actionButton";
import StandardButton from "@/components/standardButton";


export default function Responsable() {
  const [loading, setLoading] = useState(true)
  const [ticketsResponsable, setTicketsResponsable] = useState([])
  const router = useRouter();
  const { legajo } = router.query;

  useEffect(() => {
    if (ticketsResponsable){
      // levanto del localStorage el nombre completo
      const nameCompleto = window.localStorage.getItem("fullName")
      // @ts-ignore
      setElementInnerHtml("responsable", nameCompleto)
    }
  }, [ticketsResponsable])

  useEffect(() => {
    if (legajo) {
      console.log(legajo)
      fetch(`https://psa-support-management.onrender.com/employees/${legajo}/tickets`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setTicketsResponsable(res)
      }).finally(() => setLoading(false))
    }
  }, [legajo])

  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    <div className="container max-w-7xl mx-auto mt-8 space-y-50">
    <div className="mb-4">
        <h1 className="text-2xl text-black font-bold decoration-black text-center" id="responsable"></h1>
      </div>
      <div className="mb-4">
        <h1 className="text-2xl text-black font-bold decoration-black">Tickets a cargo:</h1>
      </div>
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
      <>
      <StandardTicketTable list={ticketsResponsable} />
      <div className="p-2">
        <StandardButton onClick={() => router.back()} title="Volver" back/>
      </div>
      </>
      }
    </div>
  </div>
  )
}