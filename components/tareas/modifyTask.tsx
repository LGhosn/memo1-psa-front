import { useRouter } from "next/router";
import SuccessfulNotification from "../successfulNotification";
import { useState} from "react";
import ErrorModal from "../errorMessageModal";
import { StatusPath } from "@/types/types";
import { useEffect } from "react";


type PropsForm = {
  title: string;
  setOpenStatus: (value: boolean) => void;
  url: string;
  task: any;
};

export function ModifyTask({setOpenStatus , title, url, task}: PropsForm) {
  const router = useRouter();
  const [modalSuccessful, setModalSuccessful] = useState(false);

  const [name, setName] = useState(`${task['name']}`);
  const [description, setDescription] = useState(`${task['description']}`);
  

  const [response , setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');

  function closeForm() {setOpenStatus(false);}
  function reloadPage(){router.reload() }
  function closeErrorMessage() { setErrorMessage('') }

  useEffect( () => {
    setLoading(true)
    fetch(`https://psa-project-managment.onrender.com/api/v1/employees`)
        .then(response => response.json())
        .then(data => {
          setResponse(data);
          let select = document.getElementById('assignedTo');
          // @ts-ignore
          let opts = document.getElementById('assignedTo').length;
          if (opts < 3) {
            // @ts-ignore
            data?.map(e => {
              let opt = document.createElement('option');
              opt.value       =  e['Nombre'] + ' ' + e['Apellido'];
              opt.innerText   = e['Nombre'] + ' ' + e['Apellido'];
              // @ts-ignore
              select.appendChild(opt);
            });
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
  }, [loading]);

  
  function updateState() {
    let assignedTo = document.getElementById("assignedTo")
    const state = document.getElementById("state");
    // @ts-ignore
    const stateValue=state[state.selectedIndex].value;
    console.log(stateValue)

    const data = {        
        "name": name,
        "description": description,
        //@ts-ignore
        "assignedTo": assignedTo[assignedTo.selectedIndex].value,
        "status": stateValue
    }

    
    if (stateValue !== "Seleccione una opcion") {
    fetch(url+`${stateValue}`, {
    method: 'PATCH'})
    .then((res) => {
      res.json()
    }).then(() => {
                  setModalSuccessful(true);
                }) }

    fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/task/${task['id']}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Error en la creación del recurso');
              }
              return res.json();
            })
            .then(() => {
              setModalSuccessful(true);
            })
            
            // @ts-ignore
            .catch((error) => {
              setErrorMessage('No se pudo crear el proyecto.')
             })

}

  return (
    <>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h1 className="text-xl font-bold leading-6 text-gray-900 mb-4">Edición de tarea</h1>
                  <div className="mt-2">
                  <div>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nombre</label>
                      <div className="mt-1">
                        <textarea value={name} placeholder="name" onChange={(e) => setName(e.target.value)}  className=" shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Descripción</label>
                      <div className="mt-1">
                        <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className=" shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Responsable asignado</label>
                      <select id="assignedTo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        { error && <option>Error al obtener los empleados..</option>}
                        <option value={task['assignedTo']}>Seleccione una opción</option>
                        { loading}
                      </select>
                    </div>
                      <label htmlFor="email" className="text-base block font-medium text-gray-700">Estado de {title} </label>
                        <div className="mt-1">
                          <select id="state" name="state" autoComplete="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option>Seleccione una opcion</option> 
                            <option value={"notStarted"}>No iniciado</option>
                            <option value={"inProgress"}>En progreso</option>
                            <option value={"completed"}>Completado</option>
                            <option value={"blocked"}>Bloqueado</option>
                          </select>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button  type="button" onClick={closeForm} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Cancelar</button>
                        <button type="button" onClick={updateState} className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Modificar
                        </button>
                    </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>
           
            
            

          </div>
        </div>
      </div>
    </div>
    {modalSuccessful && (
      <SuccessfulNotification titleAction="modificado" actionPage={reloadPage}/>
    )}
    {errorMessage &&
         <ErrorModal action= {closeErrorMessage}/>
    }
    </>
  )
}