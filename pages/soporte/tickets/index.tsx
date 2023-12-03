import HeaderItem from "@/components/headerItem";
import TicketGridRow from "@/components/ticketGridRow";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { Button } from "@/components/button";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import ButtonForCreation from "@/pages/soporte/ButtonForCreation";
import StandardTicketTable from "@/components/soporte/standardTicketTable";

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
            <h1 className="text-3xl text-black font-bold decoration-black">Tickets</h1>
          </div>
          {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
          <>
          <StandardTicketTable list={list} />
          <div className="p-2 flex justify-end">
            <ButtonForCreation title="Crear ticket" />
          </div>
          </>
          }
        </div>
      </div>
    )
}

