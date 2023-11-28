import { ActionButton } from "@/components/actionButton";
import InputElement from "@/components/inputElement";
import Loading from "@/components/loading";
import { MainButton } from "@/components/mainButton";
import Notification from "@/components/notification";
import SelectElement from "@/components/selectElement";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { priorityData, severityData, stateData } from "@/utils/ticketInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml, setElementValue, setSelectValue } from "@/utils/utils";

export default function Ticket() {
  const [loading, setLoading] = useState(true)
  const [ticket, setTicket] = useState([])
  const [responsables, setResponsables] = useState([])
  const [notification, setNotification] = useState(false)
  const [responsablesAsignados, setResponsablesAsignados] = useState([])
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setupData() {
  // @ts-ignore
    setElementInnerHtml("title", ticket.title);
    // @ts-ignore
    setElementValue("description", ticket.description);
    // @ts-ignore
    setSelectValue("state", ticket.state);
    // @ts-ignore
    setSelectValue("severity", ticket.severity);
    // @ts-ignore
    setSelectValue("priority", ticket.priority);
    // @ts-ignore
    setElementValue("typeOfProblem", ticket.type);
    // @ts-ignore
    setElementValue("customerRS", ticket.customerRS);
    // @ts-ignore
    setElementValue("customerCUIT", ticket.customerCUIT);
    // @ts-ignore
    setElementValue("creationDate", ticket.creationDate);
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
    if (!loading) {
      fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
      .then(response => response.json())
      .then(data => {
        const nuevosResponsables = data.map((item: { legajo: any; Apellido: any; Nombre: any; }) => ({
          value: item.legajo,
          label: `${item.Apellido}, ${item.Nombre}`
        }));
        setResponsables(nuevosResponsables)
      }).then(() => setupData())
    }
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

  function guardarTicket() {
    // @ts-ignore
    const state = document.getElementById("state").value
    // @ts-ignore
    const severity = document.getElementById("severity").value
    // @ts-ignore
    const priority = document.getElementById("priority").value
    // const responsable = {}
    // for (let i = 0; i < responsablesAsignados.length; i++) {
    //   // @ts-ignore
    //   const legajo = responsablesAsignados[i].split(',')[0]
    //   // @ts-ignore
    //   const nombre = responsablesAsignados[i].split(',')[1].replace(/^\s+|\s+$/g, '')
    //   // @ts-ignore
    //   const apellido = responsablesAsignados[i].split(',')[2]
    //   // @ts-ignore
    //   responsable[i] = {
    //     "legajo": legajo,
    //     "name": nombre,
    //     "lastname": apellido,
    //     "tickets": []
    //   }
    // }


    fetch(`https://psa-support-management.onrender.com/tickets/${id}/updateFields?newState=${state}&newSeverity=${severity}&newPriority=${priority}`, {
      method: 'PATCH',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      router.reload()
    })

    // fetch(`https://psa-support-management.onrender.com/tickets/${id}/updateResponsible?NewResponsible=${responsable}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'accept': '*/*',
    //     'Content-Type': 'application/json'
    //   },
    // }).then((res) => {
    //   router.reload()
    // })
  }

  // @ts-ignore
  const handleSelectChange = (event) => {
    // @ts-ignore
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value + ','+ option.text);
    // @ts-ignore
    setResponsablesAsignados(opcionesSeleccionadas);
    console.log(opcionesSeleccionadas)
  }
  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    <div className="container max-w-2xl mx-auto mt-8">
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
      notification ? 
        <Notification deleteTicket={deleteTicket} cancelDelete={cancelDelete} accion="borrar" />
      :
     <>
      <div className="flex flex-col border-4 border-gray-500 w-full h-11/12 p-9 mt-20 mb-10">
        <h1 className="text-4xl mb-5 font-bold text-black text-center" id="title" ></h1>
        <div className="flex flex-row space-x-10">
        <div className="pr-2">
          <SelectElement title="Estado" id="state" options={stateData} multiple={false}/>
          <SelectElement title="Prioridad" id="priority" options={priorityData} multiple={false}/>
          <SelectElement title="Severidad" id="severity" options={severityData} multiple={false}/>
          <SelectElement title="Responsable" id="responsables" options={responsables} multiple onChange={handleSelectChange}/>
        </div>
        <div>
          <InputElement title="Tipo de problema" id="typeOfProblem" type="text" readonly/>
          <InputElement title="Razón Social Cliente" id="customerRS" type="text" readonly/>
          <InputElement title="CUIT Cliente" id="customerCUIT" type="text" readonly/>
          <InputElement title="Fecha de creación" id="creationDate" type="text" readonly/>
          <InputElement title="Descripción" id="description" type="textarea" readonly/>
        </div>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-10">
        <MainButton href={"/soporte/tickets"} title="Volver" />
        <ActionButton onClick={() => setNotification(true)} title="Borrar" style="bg-red-400 dark:hover:bg-red-700" />
        <ActionButton title="Guardar" onClick={guardarTicket}/>
      </div>
      </>
    }
    </div>
   </div>
  )
}