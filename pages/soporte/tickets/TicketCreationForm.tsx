import AlertMessage from "@/components/alertMessage";
import InputElement from "@/components/inputElement";
import Loading from "@/components/loading";
import SelectElement from "@/components/selectElement";
import SuccessfulNotification from "@/components/successfulNotification";
import { priorityData, severityData, typeOfProblemData } from "@/utils/ticketInfo";
import {useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";

type PropsForm = {
  title: string;
  openForm: boolean
  setOpenForm: (value: boolean) => void
};

export default function TicketCreationForm({ title, openForm, setOpenForm }: PropsForm) {
  //let navigate = useNavigate();
  const [cliente , setClientes] = useState([])
  const [producto, setProductos] = useState([])
  const [alert, setAlert] = useState(false)
  const [modalSuccessful, setModalSuccessful] = useState(false)
  
  useEffect( () => {
    fetch("https://psa-support-management.onrender.com/customers/externalApiCustomers")
        .then(response => response.json())
        .then(data => {
          const clientes = data.map((item: { id: any; rs: any; CUIT: any; }) => ({
            value: item.id + ";" + item.CUIT,
            // @ts-ignore
            label: `${item['razon social']}`
          }));
          setClientes(clientes)
        })
        .catch(error =>  console.log(error))

    fetch("https://psa-support-management.onrender.com/products/")
    .then(response => response.json())
    .then(data => {
      const productos = data.map((item: { id: any; name: any; version: any; }) => ({
        value: item.id,
        label: `${item.name} - ${item.version}`
      }));
      setProductos(productos)
    })
  }, []);

  function closeForm() { 
    setOpenForm(false); 
    // parent.window.location.reload();
  }

  function createTicket() {
    let customers = document.getElementById("customers")
    let title = document.getElementById("title")
    let description = document.getElementById("description")
    let severity = document.getElementById("severity")
    let priority = document.getElementById("priority")
    let typeOfProblem = document.getElementById("typeOfProblem")
    let product = document.getElementById("producto")

    // comprebo que los campos obligatorios esten completos
    // @ts-ignore
    if (customers.value === "-1" || title.value === "" || description.value === "" || severity.value === "-1" || priority.value === "-1" || typeOfProblem.value === "-1" || product.value === "-1") {
      setAlert(true)
      return
    }

    const ticket = {
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
    }
    const cliente = {
      // @ts-ignore
      "id": customers.value.split(';')[0],
      // @ts-ignore
      "rs": customers[customers.selectedIndex].text,
      // @ts-ignore
      "cuit": customers.value.split(';')[1],
    }

    const data = {"ticket": ticket, "customer": cliente}
    console.log(data)
    // @ts-ignore
    fetch(`https://psa-support-management.onrender.com/tickets/?idProduct=${product.value}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
        .then((res) => res.json())
        // @ts-ignore
        .catch((error) => console.log(error))
    
    setModalSuccessful(true)
  }

  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className=" rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                      <div className="mt-2">
                        <InputElement title="Título" id="title" type="text" readonly={false}/>
                        <SelectElement title="Clientes" id="customers" options={cliente} multiple={false}/>
                        <SelectElement title="Producto" id="producto" options={producto} multiple={false}/>
                        <SelectElement title="Prioridad" id="priority" options={priorityData} multiple={false}/>
                        <SelectElement title="Severidad" id="severity" options={severityData} multiple={false}/>
                        <SelectElement title="Tipo de Problema" id="typeOfProblem" options={typeOfProblemData} multiple={false}/>
                        <InputElement title="Descripción" id="description" type="textarea" readonly={false}/>
                      </div>
                  </div>
                </div>
              </div>
              {alert ? <AlertMessage message="Debe completar todos los campos." onClick={() => setAlert(false)}/>: <></>}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeForm}>Cancel</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={createTicket}>Crear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalSuccessful && (
        <SuccessfulNotification titleAction="guardado" actionPage={closeForm}/>
      )}  
      </>
  )
}