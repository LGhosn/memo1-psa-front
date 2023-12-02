import { ActionButton } from "@/components/actionButton";
import InputElement from "@/components/inputElement";
import Loading from "@/components/loading";
import SelectElement from "@/components/selectElement";
import { SideBar } from "@/components/sideBar";
import { supportSideBarItems } from "@/utils/routes";
import { priorityData, severityData, stateData, translationTypeOfProblem } from "@/utils/ticketInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setElementInnerHtml, setElementValue, setFormatDate, setSelectValue } from "@/utils/utils";
import SuccessfulNotification from "@/components/successfulNotification";

export default function Ticket() {
  const [loading, setLoading] = useState(true)
  const [ticket, setTicket] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [responsablesAsignados, setResponsablesAsignados] = useState([])
  const [responsables, setResponsables] = useState([])
  const [modalSuccessful, setModalSuccessful] = useState(false)
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
    setElementValue("typeOfProblem", translationTypeOfProblem[ticket.type]);
    // @ts-ignore
    setElementValue("customerRS", ticket.customerRS);
    // @ts-ignore
    setElementValue("customerCUIT", ticket.customerCUIT);
    // @ts-ignore
    setElementValue("creationDate", setFormatDate(ticket.creationDate));
  }

  function setupResponsables(){
    const listResponsables = document.getElementById("responsables")
    for (let i = 0; i < responsables.length; i++) {
      // @ts-ignore
      for (let j = 0; j < listResponsables.length; j++) {
        // @ts-ignore
        if (responsables[i].legajo == listResponsables.options[j].value){
          // @ts-ignore
          listResponsables.options[j].selected = true
          // @ts-ignore
          listResponsables.options[0].selected = false
        }
      }
    }
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

      fetch(`https://psa-support-management.onrender.com/tickets/${id}/responsible`)
      .then((res) => {
        return res.json()
      }).then((res) => {
        setResponsables(res)
      })
    }
  }, [id])

  useEffect(() => {
    if (!loading) {
      setupData()
      fetch("https://psa-support-management.onrender.com/employees/externalApiEmployees")
      .then(response => response.json())
      .then(data => {
        const employees = data.map((item: { legajo: any; Apellido: any; Nombre: any; }) => ({
          value: item.legajo,
          label: `${item.Apellido}, ${item.Nombre}`
        }));
        setEmpleados(employees)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (empleados.length > 0) {
      setupResponsables()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empleados])

  function deleteTicket() {
    fetch(`https://psa-support-management.onrender.com/tickets/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      router.push('/soporte/tickets')
    })
  }

  function cancelDelete() {
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
    const responsable = []
    for (let i = 0; i < responsablesAsignados.length; i++) {
      // @ts-ignore
      const split = responsablesAsignados[i].split(',')
      // @ts-ignore
      const legajo = split[0]
      // @ts-ignore
      const apellido = split[1].replace(/^\s+|\s+$/g, '')
      // @ts-ignore
      const nombre = split[2].replace(/^\s+|\s+$/g, '')
      // @ts-ignore
      responsable[i] = {
        "legajo": legajo,
        "firstName": nombre,
        "lastName": apellido
      }
    }
    console.log(responsable)

    fetch(`https://psa-support-management.onrender.com/tickets/${id}/updateFields?newState=${state}&newSeverity=${severity}&newPriority=${priority}`, {
      method: 'PATCH',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
    })

    fetch(`https://psa-support-management.onrender.com/tickets/${id}/assignResponsible`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responsable)
    })
    setModalSuccessful(true)
  }

  // @ts-ignore
  const handleSelectChange = (event) => {
    // @ts-ignore
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value + ','+ option.text);
    // @ts-ignore
    setResponsablesAsignados(opcionesSeleccionadas);
  }
  return (
    <>
    <div className="flex flex-row">
      <SideBar items={supportSideBarItems} />
      <div className="container mx-auto mt-8 p-4">
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8">
              <h1 className="text-3xl font-bold mb-4 text-center text-black" id="title"></h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <SelectElement title="Estado" id="state" options={stateData} multiple={false} />
                  <SelectElement title="Prioridad" id="priority" options={priorityData} multiple={false} />
                  <SelectElement title="Severidad" id="severity" options={severityData} multiple={false} />
                  <SelectElement title="Responsable" id="responsables" options={empleados} multiple onChange={handleSelectChange} />
                </div>
                <div>
                  <InputElement title="Tipo de problema" id="typeOfProblem" type="text" readonly />
                  <InputElement title="CUIT Cliente" id="customerCUIT" type="text" readonly />
                  <InputElement title="Razón Social Cliente" id="customerRS" type="text" readonly />
                  <InputElement title="Fecha de creación" id="creationDate" type="text" readonly />
                  <InputElement title="Descripción" id="description" type="textarea" readonly />
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <ActionButton onClick={() => router.back()} title="Volver" />
              {/* @ts-ignore */}
              <ActionButton onClick={() => router.push(`/soporte/tareas?ticketId=${id}&ticketName=${ticket.title}`)} title="Tareas" />
              <ActionButton title="Guardar" onClick={guardarTicket} />
            </div>
          </>
        )}
      </div>
    </div>
    {modalSuccessful && (
      <SuccessfulNotification titleAction="guardado" actionPage={() => router.reload()}/>
    )}
    </>
  )
}