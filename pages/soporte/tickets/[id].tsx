import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Ticket() {
  const [loading, setLoading] = useState(true)
  const [ticket, setTicket] = useState([])
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setupData() {
    let title = document.getElementById("title")
    let description = document.getElementById("description")
    let state = document.getElementById("state")
    let severity = document.getElementById("severity")
    let priority = document.getElementById("priority")
    let typeOfProblem = document.getElementById("typeOfProblem")

    console.log(ticket)
    // @ts-ignore
    title.innerText = `Titulo:${ticket['title']}`
    // @ts-ignore
    description.innerText = `Descripción:${ticket['description']}`
    // @ts-ignore
    state.innerText = `Estado:${ticket['state']}`
    // @ts-ignore
    severity.innerText = `Severidad:${ticket['severity']}`
    // @ts-ignore
    priority.innerText = `Prioridad:${ticket['priority']}`
    // @ts-ignore
    typeOfProblem.innerText = `Tipo:${ticket['type']}`
  }

  useEffect(() => {
    if (id) {
      fetch(`https://psa-support-management.onrender.com/tickets/${id}`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setTicket(res)
        setLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if (!loading)
      setupData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    {
    loading ? <div className="flex flex-row justify-center"> <Loading /> </div>:
    <div className="container max-w-2xl mx-auto mt-8">
     <div className="border-4 border-blue-500" style={{ width: 900, height: 500, marginTop:"20px" }}>
       <h1 className="text-4xl mb-5 font-bold" style={{textAlign:'center', marginTop:"20px"}}>{id}</h1>
       <div className="flex items-center text-gray-900" id="title"></div>
        <div className="flex items-center text-gray-900" id="description"></div>
        <div className="flex items-center text-gray-900" id="state"></div>
        <div className="flex items-center text-gray-900" id="priority"></div>
        <div className="flex items-center text-gray-900" id="severity"></div>
        <div className="flex items-center text-gray-900" id="typeOfProblem"></div>
       <div className='flex justify-center'>
       </div>
       <MainButton href= {`/soporte/tickets`} title= "Volver"/>       
    </div>
    </div>
    }
   </div>
  )
}