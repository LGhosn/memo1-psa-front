import { ActionButton } from "@/components/actionButton";
import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Ticket() {
  const [loading, setLoading] = useState(true)
  const [ticket, setTicket] = useState([])
  const [notification, setNotification] = useState(false)
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
    title.innerHTML = ticket['title']
    // @ts-ignore
    description.value = ticket['description']
    // @ts-ignore
    state.value = ticket['state']
    // @ts-ignore
    severity.value = ticket['severity']
    // @ts-ignore
    priority.value = ticket['priority']
    // @ts-ignore
    typeOfProblem.value = ticket['type']
  }

  useEffect(() => {
    setLoading(true)
    fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
        .then(response => response.json())
        .then(data => {
          let select = document.getElementById('employees');
          // @ts-ignore
          let opts = document.getElementById('employees').length;
          if (opts < 3) {
            // @ts-ignore
            data?.map(e => {
              let opt = document.createElement('option');
              opt.value       = e['id'] + ';' + e['CUIT']
              opt.innerText   = e['razon social'];
              // @ts-ignore
              select.appendChild(opt);
            });
          }
        })
        .finally(() => setLoading(false))
  }, [])

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

  function deleteTicket() {
    fetch(`https://psa-support-management.onrender.com/tickets/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      router.push('/soporte/tickets')
    })
  }

  function cancelDelete() {
    setNotification(false)
    setLoading(true)
    //recargo la pagina
    router.reload()
  }

  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    <div className="container max-w-2xl mx-auto mt-8">
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
      notification ? 
        <div className="flex flex-row justify-center items-center">
          <div className="dark:bg-gray-800 sm:p-5 p-4 w-full max-w-2xl h-full md:h-auto">
            <h1 className="text-2xl text-center font-bold mb-5">¿Desea borrar el ticket?</h1>
            <div className="flex flex-row justify-center space-x-10">
              <ActionButton onClick={deleteTicket} title= "Borrar" style="bg-red-400 dark:hover:bg-red-700"/>
              <ActionButton onClick={cancelDelete} title= "Cancelar"/>
            </div>
          </div>
        </div>
      :
     <>
      <div className="border-4 border-gray-500 w-full h-11/12 p-9 mt-20 mb-10">
        <h1 className="text-4xl mb-5 font-bold text-black text-center" id="title" ></h1>
        <div className="p-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <div className="mt-1">
            <input name="description" id="description" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md text-gray-900"></input>
          </div>
        </div>
        <div className="p-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
          <div className="mt-1">
            <input name="state" id="state" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md text-gray-900"></input>
          </div>
        </div>
        <div className="p-2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <div className="mt-1">
            <input name="priority" id="priority" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md text-gray-900"></input>
          </div>
        </div>
        <div className="p-2">
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severidad</label>
          <div className="mt-1">
            <input name="severity" id="severity" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md text-gray-900"></input>
          </div>
        </div>
        <div className="p-2">
          <label htmlFor="typeOfProblem" className="block text-sm font-medium text-gray-700">Tipo de problema</label>
          <div className="mt-1">
            <input name="typeOfProblem" id="typeOfProblem" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md text-gray-900"></input>
          </div>
        </div>


        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Responsable</label>
          <select id="employees" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            { loading && <option>Cargando Responsables..</option> }
            <option>Seleccionar</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-10">
        <MainButton href={"/soporte/tickets"} title="Volver" />
        <ActionButton onClick={() => setNotification(true)} title="Borrar" style="bg-red-400 dark:hover:bg-red-700" />
        <ActionButton title="Guardar" />
      </div>
      </>
    }
    </div>
   </div>
  )
}