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
    <div className="container max-w-2xl mx-auto mt-8">
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
     <>
      <h1 className="text-4xl mb-5 font-bold text-black text-center p-5" id="responsable" ></h1>
      <span className="text-xl font-bold text-black text-left p-3">Tickets a cargo:</span>
      <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 p-2">
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
              {ticketsResponsable.map((tarea) => (
                <TicketGridRow key={tarea['id']} task={tarea} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-10 p-2">
        <MainButton href={"/soporte/responsables"} title="Volver" />
      </div>
      </>
    }
    </div>
   </div>
  )
}