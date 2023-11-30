import { ActionButton } from "@/components/actionButton";
import InputElement from "@/components/inputElement";
import Loading from "@/components/loading";
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
  const [empleados, setEmpleados] = useState([])
  const [responsablesAsignados, setResponsablesAsignados] = useState([])
  const [responsables, setResponsables] = useState([])
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
      fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
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
    router.reload()
  }

  // @ts-ignore
  const handleSelectChange = (event) => {
    // @ts-ignore
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value + ','+ option.text);
    // @ts-ignore
    setResponsablesAsignados(opcionesSeleccionadas);
  }
  return (
    <div className="flex flex-row">
    <SideBar items={supportSideBarItems}></SideBar>
    <div className="container max-w-2xl mx-auto mt-8">
      {
      loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
     <>
      <div className="flex flex-col border-4 border-gray-500 w-full h-11/12 p-9 mt-20 mb-10">
        <h1 className="text-4xl mb-5 font-bold text-black text-center" id="title" ></h1>
        <div className="flex flex-row space-x-10">
        <div className="pr-2">
          <SelectElement title="Estado" id="state" options={stateData} multiple={false}/>
          <SelectElement title="Prioridad" id="priority" options={priorityData} multiple={false}/>
          <SelectElement title="Severidad" id="severity" options={severityData} multiple={false}/>
          <SelectElement title="Responsable" id="responsables" options={empleados} multiple onChange={handleSelectChange}/>
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
        <ActionButton onClick={() => router.back()} title="Volver" />
        <ActionButton title="Guardar" onClick={guardarTicket}/>
      </div>
      </>
    }
    </div>
   </div>
  )
}