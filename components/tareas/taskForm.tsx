import {useEffect, useState} from "react";
import SuccessfulNotification from "../successfulNotification";
import { useRouter } from "next/router";
import ErrorModal from "../errorMessageModal";

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

  function closeForm() { setOpenForm(false); }
  function closeErrorMessage() { setErrorMessage('') }
  function reloadPage(){ router.reload() }

  

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
      setErrorMessage('No se pudo crear la tarea. Ingreso de valor inválido');
     })
  }

  return (
    <>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/*el div de abajo modifica el tamaño  sm-*/}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-2 sm:w-auto sm:max-w-xl">
            <div className="bg-gray-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start justify-center">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-xl font-bold leading-6 text-gray-900" id="modal-title">Nueva tarea</h3>
                  <div className="mt-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nombre</label>
                      <div className="mt-1">
                        <textarea name="name" id="name" className=" shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Descripción</label>
                      <div className="mt-1">
                        <textarea name="description" id="description" className=" shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black-600 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"></textarea>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:black">Responsable a cargo de la tarea</label>
                      <select id="leader" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        { error && <option>Error al obtener los empleados..</option>}
                        { loading && <option >Cargando empleados..</option>}
                      </select>
                    </div>

                    <div className="p-4 md:p-5 text-center">
                
                    <button type="button" onClick={createTask} className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                      Crear tarea
                    </button>
                    <button  type="button" onClick={closeForm} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                      Cancelar</button>
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
        <>
        <SuccessfulNotification titleAction="guardado" actionPage={reloadPage}/>
        </>
       )}  
       {errorMessage &&
         <ErrorModal action= {closeErrorMessage}/>
          }
     
      </>
  )
}