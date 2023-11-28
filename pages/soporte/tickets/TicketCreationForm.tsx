import InputElement from "@/components/inputElement";
import SelectElement from "@/components/selectElement";
import { priorityData, severityData, typeOfProblemData } from "@/utils/ticketInfo";
import {useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";

type PropsForm = {
  title: string;
  openForm: boolean
  setOpenForm: (value: boolean) => void
};

export function TicketCreationForm({ title, openForm, setOpenForm }: PropsForm) {
  //let navigate = useNavigate();
  const [response , setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [responsables, setResponsables] = useState([])
  
  useEffect( () => {
    setLoading(true)
    fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
        .then(response => response.json())
        .then(data => {
          setResponse(data);
          let select = document.getElementById('customers');
          // @ts-ignore
          let opts = document.getElementById('customers').length;
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
        .catch(error => setError(error))
        .finally(() => setLoading(false))

    fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
    .then(response => response.json())
    .then(data => {
      const nuevosResponsables = data.map((item: { legajo: any; Apellido: any; Nombre: any; }) => ({
        value: item.legajo,
        label: `${item.Apellido}, ${item.Nombre}`
      }));
      setResponsables(nuevosResponsables)
    })
  }, []);

  function closeForm() { 
    setOpenForm(false); 
    parent.window.location.reload();
  }

  function createTicket() {
    let customers = document.getElementById("customers")
    let title = document.getElementById("title")
    let description = document.getElementById("description")
    let severity = document.getElementById("severity")
    let priority = document.getElementById("priority")
    let typeOfProblem = document.getElementById("typeOfProblem")
    let r = document.getElementById("responsables")

    const data = {
      // @ts-ignore
      "title": title.value,
      // @ts-ignore
      "description": description.value,
      // @ts-ignore
      "priority": priority.value,
      // @ts-ignore
      "severity": severity.value,
      // @ts-ignore
      "state": "OPEN",
      // @ts-ignore
      "type": typeOfProblem.value,
      // @ts-ignore
      "customerId": customers.value.split(';')[0],
      // @ts-ignore
      "customerCUIT": customers.value.split(';')[1],
      // @ts-ignore
      "customerRS": customers[customers.selectedIndex].text,
      // // @ts-ignore
      // "employees": [
      //   {
      //     // @ts-ignore
      //     "name": r[r.selectedIndex].text.split(',')[1].replace(/^\s+|\s+$/g, ''),
      //     // @ts-ignore
      //     "lastname": r[r.selectedIndex].text.split(',')[0].replace(/^\s+|\s+$/g, ''),
      //     "tickets": [
      //       "prueba"
      //     ]
      //   }
      // ]

    }
    // @ts-ignore
    fetch('https://psa-support-management.onrender.com/tickets/', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
          closeForm()
        })
        // @ts-ignore
        .catch((error) => setError("No se pudo crear el ticket"))
  }

  return (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                    <div className="mt-2">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Cliente</label>
                        <select id="customers" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          { error && <option>Error al obtener clientes..</option>}
                          { loading && <option>Cargando clientes..</option>}
                        </select>
                      </div>
                      <InputElement title="Título" id="title" type="text" readonly={false}/>
                      <InputElement title="Descripción" id="description" type="textarea" readonly={false}/>
                      <SelectElement title="Prioridad" id="priority" options={priorityData} multiple={false}/>
                      <SelectElement title="Severidad" id="severity" options={severityData} multiple={false}/>
                      <SelectElement title="Tipo de Problema" id="typeOfProblem" options={typeOfProblemData} multiple={false}/>
                      <SelectElement title="Responsable" id="responsables" options={responsables} multiple={false}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeForm}>Cancel</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={createTicket}>Crear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}