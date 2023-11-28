import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import SuccessfulNotification from "../successfulNotification";

type PropsForm = {
  title: string;
  projectId: string;
  setOpenForm: (value: boolean) => void
};

export function TaskCreationForm({ title,projectId, setOpenForm }: PropsForm) {
  const [response , setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalSuccessful, setModalSuccessful] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  
  function reloadPage(){
    router.reload() 
  }

  function closeForm() { setOpenForm(false); }
  

  useEffect( () => {
    setLoading(true)
    fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
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
              opt.value       = e['legajo'];
              opt.innerText   = e['Apellido'] + ' ' + e['Nombre'];
              // @ts-ignore
              select.appendChild(opt);
            });
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
  }, []);

  function createTask() {
    let name = document.getElementById("name")
    let description = document.getElementById("description")
    let assignedTo = document.getElementById("assignedTo")

    const data = {
      // @ts-ignore
      "name": name.value,
      // @ts-ignore
      "description": description.value,
      // @ts-ignore
      "assignedTo": assignedTo[assignedTo.selectedIndex].text
    }
    console.log(data)
    // @ts-ignore
    fetch(`https://psa-project-managment.onrender.com/api/v1/tasks/project/${projectId}`, {
      method: 'POST',
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
      console.error('Error:', error);
      setErrorMessage('No se pudo crear el proyecto. Ingreso de valor inválido');
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
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                    <div className="mt-2">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Titulo</label>
                        <div className="mt-1">
                          <textarea name="name" id="name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <div className="mt-1">
                          <textarea name="description" id="description" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Líder de proyecto</label>
                        <select id="assignedTo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          { error && <option>Error al obtener los empleados..</option>}
                          { loading && <option>Cargando empleados..</option>}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeForm}>Cancel</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
                onClick={createTask}>Crear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalSuccessful && (
        <>
        <SuccessfulNotification titleAction="Guardado" actionPage={reloadPage}/>
        </>
       )}  
    </>
  )
}